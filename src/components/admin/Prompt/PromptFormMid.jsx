import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  message,
  InputNumber,
  Row,
  Col,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../../services/api";

const { Option } = Select;

const QuillEditorItem = ({ label, value, onChange }) => {
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await api.uploadImage(formData);
          const url = response.data.imageUrls[0];
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection() || { index: 0 };
          quill.insertEmbed(range.index, "image", url);
        } catch (error) {
          message.error("Lỗi khi upload ảnh");
          console.error(error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Form.Item label={label}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        onFocus={() => {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            setTimeout(() => {
              quill.focus();
            }, 0);
          }
        }}
      />
    </Form.Item>
  );
};

const PromptFormMid = ({ topic, promptId, categories, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contentValues, setContentValues] = useState({
    content: "",
    tips: "",
    text: "",
    how: "",
    output: "",
    OptimationGuide: "",
    addtip: "",
    addinformation: "",
  });
  const [categoriesMid, setCategoriesMid] = useState([]);
  const [numPromDetails, setNumPromDetails] = useState(0);
  const [numExampleVariables, setNumExampleVariables] = useState(0);
  const [promDetails, setPromDetails] = useState([]);
  const [showPromDetailsForm, setShowPromDetailsForm] = useState(false);
  const [showExampleVariablesForm, setShowExampleVariablesForm] =
    useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategoriesBySection(3);
      setCategoriesMid(response.data.categories);
    } catch (error) {
      message.error("Failed to fetch categories");
      console.error(error);
    }
  };

  const isEditMode = !!promptId;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      fetchPromptDetails();
    } else {
      form.resetFields();
      setContentValues({
        content: "",
        tips: "",
        text: "",
        how: "",
        output: "",
        OptimationGuide: "",
        addtip: "",
        addinformation: "",
      });
      setNumPromDetails(0);
      setNumExampleVariables(0);
      setPromDetails([]);
      setShowPromDetailsForm(false);
      setShowExampleVariablesForm(false);
    }
  }, [promptId, form]);

  const fetchPromptDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getPromptById(promptId);
      const prompt = response.data;

      form.setFieldsValue({
        title: prompt.title,
        short_description: prompt.short_description,
        category_id: prompt.category_id,
        is_type: prompt.is_type,
        what: prompt.what,
        topic_id: prompt.topic_id,
      });

      setContentValues({
        content: prompt.content,
        tips: prompt.tips,
        text: prompt.text,
        how: prompt.how,
        output: prompt.output,
        OptimationGuide: prompt.OptimationGuide,
        addtip: prompt.addtip,
        addinformation: prompt.addinformation,
      });

      if (prompt.promDetails && prompt.promDetails.length > 0) {
        const promDetailsType1 = prompt.promDetails.filter(
          (item) => item.type === 1
        );
        const exampleVariablesType2 = prompt.promDetails.filter(
          (item) => item.type === 2
        );

        setNumPromDetails(promDetailsType1.length);
        setNumExampleVariables(exampleVariablesType2.length);
        setPromDetails(
          prompt.promDetails.map((item, idx) => ({ ...item, index: idx }))
        );
        setShowPromDetailsForm(promDetailsType1.length > 0);
        setShowExampleVariablesForm(exampleVariablesType2.length > 0);
      }
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmNumPromDetails = () => {
    if (numPromDetails < 0) {
      message.error("Số lượng không hợp lệ");
      return;
    }
    const newPromDetails = Array.from({ length: numPromDetails }, (_, i) => ({
      text: "",
      image: "",
      type: 1,
      index: i,
    }));
    setPromDetails((prev) => [
      ...prev.filter((item) => item.type === 2),
      ...newPromDetails,
    ]);
    setShowPromDetailsForm(true);
  };

  const handleConfirmNumExampleVariables = () => {
    if (numExampleVariables < 0) {
      message.error("Số lượng không hợp lệ");
      return;
    }
    const newExampleVariables = Array.from(
      { length: numExampleVariables },
      (_, i) => ({
        text: "",
        image: "",
        description: "",
        type: 2,
        index: i,
      })
    );
    setPromDetails((prev) => [
      ...prev.filter((item) => item.type === 1),
      ...newExampleVariables,
    ]);
    setShowExampleVariablesForm(true);
  };

  const handlePromDetailChange = (index, field, value, type) => {
    const updatedPromDetails = [...promDetails];
    const filteredItems = updatedPromDetails.filter(
      (item) => item.type === type
    );
    const itemIndex = updatedPromDetails.findIndex(
      (item) => item.type === type && filteredItems.indexOf(item) === index
    );
    if (itemIndex !== -1) {
      updatedPromDetails[itemIndex] = {
        ...updatedPromDetails[itemIndex],
        [field]: value,
      };
      setPromDetails(updatedPromDetails);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const promptData = {
        ...values,
        short_description: "1",
        what: values.what,
        ...contentValues,
        promDetails: promDetails.map((detail) => ({
          text: detail.text,
          image: detail.image,
          ...(detail.type === 2 && { description: detail.description }),
          type: detail.type,
          ...(detail.id && { id: detail.id }),
        })),
      };
      console.log("hii", promptData);
      if (isEditMode) {
        await api.updatePrompt(promptId, promptData);
        message.success("Cập nhật thành công!");
      } else {
        await api.createPrompt(promptData);
        setContentValues({
          content: "",
          tips: "",
          text: "",
          how: "",
          output: "",
          OptimationGuide: "",
          addtip: "",
          addinformation: "",
        });
        setNumPromDetails(0);
        setNumExampleVariables(0);
        setPromDetails([]);
        setShowPromDetailsForm(false);
        setShowExampleVariablesForm(false);
        message.success("Tạo mới thành công!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("Lỗi khi lưu dữ liệu");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{}}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: "Nhập tiêu đề" }]}
      >
        <Input placeholder="Nhập tiêu đề" />
      </Form.Item>

      <QuillEditorItem
        label="Nội dung"
        value={contentValues.content}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, content: value }))
        }
      />
      <Form.Item name="category_id" label="Thể loại">
        <Select placeholder="Chọn thể loại">
          {categoriesMid.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="is_type" label="Mức độ bài viết">
        <Select placeholder="Chọn kiểu">
          <Option value={1}>Free</Option>
          <Option value={2}>Premium</Option>
        </Select>
      </Form.Item>

      <QuillEditorItem
        label="Ảnh nền phần bài viết"
        value={contentValues.output}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, output: value }))
        }
      />
      <QuillEditorItem
        label="Tips"
        value={contentValues.tips}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, tips: value }))
        }
      />
      <QuillEditorItem
        label="Text"
        value={contentValues.text}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, text: value }))
        }
      />
      <QuillEditorItem
        label="Optimization Guide"
        value={contentValues.OptimationGuide}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, OptimationGuide: value }))
        }
      />
      <QuillEditorItem
        label="Additional Tips"
        value={contentValues.addtip}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, addtip: value }))
        }
      />

      {/* Trường nhập số lượng PromDetails (type 1) */}
      <Form.Item label="Số lượng card con (PromDetails)">
        <Row gutter={8}>
          <Col span={18}>
            <InputNumber
              min={0}
              value={numPromDetails}
              onChange={(value) => setNumPromDetails(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <Button onClick={handleConfirmNumPromDetails}>Đồng ý</Button>
          </Col>
        </Row>
      </Form.Item>

      {/* Trường nhập số lượng Example Variables (type 2) */}
      <Form.Item label="Số lượng Example Variables">
        <Row gutter={8}>
          <Col span={18}>
            <InputNumber
              min={0}
              value={numExampleVariables}
              onChange={(value) => setNumExampleVariables(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <Button onClick={handleConfirmNumExampleVariables}>Đồng ý</Button>
          </Col>
        </Row>
      </Form.Item>

      {/* Render các trường PromDetails (type 1) */}
      {showPromDetailsForm && (
        <>
          {promDetails
            .filter((detail) => detail.type === 1)
            .map((detail, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h4>PromDetail {index + 1}</h4>
                <Form.Item label="Text">
                  <Input.TextArea
                    value={detail.text}
                    onChange={(e) =>
                      handlePromDetailChange(index, "text", e.target.value, 1)
                    }
                    placeholder="Nhập text cho PromDetail"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                </Form.Item>
                <QuillEditorItem
                  label="Image"
                  value={detail.image}
                  onChange={(value) =>
                    handlePromDetailChange(index, "image", value, 1)
                  }
                />
              </div>
            ))}
        </>
      )}

      {/* Render các trường Example Variables (type 2) */}
      {showExampleVariablesForm && (
        <>
          {promDetails
            .filter((detail) => detail.type === 2)
            .map((detail, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h4>Example Variable {index + 1}</h4>
                <Form.Item label="Text">
                  <Input.TextArea
                    value={detail.text}
                    onChange={(e) =>
                      handlePromDetailChange(index, "text", e.target.value, 2)
                    }
                    placeholder="Nhập text cho Example Variable"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                </Form.Item>
                <QuillEditorItem
                  label="Description"
                  value={detail.description}
                  onChange={(value) =>
                    handlePromDetailChange(index, "description", value, 2)
                  }
                />
                {/* <Form.Item label="Description">
                  <Input.TextArea
                    value={detail.description}
                    onChange={(e) =>
                      handlePromDetailChange(
                        index,
                        "description",
                        e.target.value,
                        2
                      )
                    }
                    placeholder="Nhập description cho Example Variable"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                  />
                </Form.Item> */}
              </div>
            ))}
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          {isEditMode ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PromptFormMid;
