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

// 🖊 Component riêng cho mỗi Form.Item chứa ReactQuill
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
    input: "",
    output: "",
    OptimationGuide: "",
    addtip: "",
    addinformation: "",
  });
  const [categoriesMid, setCategoriesMid] = useState([]);
  const [numPromDetails, setNumPromDetails] = useState(0); // Số lượng PromDetails
  const [promDetails, setPromDetails] = useState([]); // Dữ liệu PromDetails
  const [showPromDetailsForm, setShowPromDetailsForm] = useState(false);

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
        input: "",
        output: "",
        OptimationGuide: "",
        addtip: "",
        addinformation: "",
      });
      setNumPromDetails(0);
      setPromDetails([]);
      setShowPromDetailsForm(false);
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
        input: prompt.input,
        output: prompt.output,
        OptimationGuide: prompt.OptimationGuide,
        addtip: prompt.addtip,
        addinformation: prompt.addinformation,
      });

      // Nếu có PromDetails từ API, cập nhật số lượng và dữ liệu
      if (prompt.promDetails && prompt.promDetails.length > 0) {
        setNumPromDetails(prompt.promDetails.length);
        setPromDetails(prompt.promDetails);
        setShowPromDetailsForm(true);
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
    setPromDetails(Array(numPromDetails).fill({ text: "", image: "" }));
    setShowPromDetailsForm(true);
  };

  const handlePromDetailChange = (index, field, value) => {
    const updatedPromDetails = [...promDetails];
    updatedPromDetails[index] = {
      ...updatedPromDetails[index],
      [field]: value,
    };
    setPromDetails(updatedPromDetails);
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
          ...(detail.id && { id: detail.id }), // Nếu có id (edit mode), thêm vào
        })),
      };
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
          input: "",
          output: "",
          OptimationGuide: "",
          addtip: "",
          addinformation: "",
        });
        setNumPromDetails(0);
        setPromDetails([]);
        setShowPromDetailsForm(false);
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
        label="Example Variables"
        value={contentValues.input}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, input: value }))
        }
      />

      <QuillEditorItem
        label="Additional Tips"
        value={contentValues.addtip}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, addtip: value }))
        }
      />

      {/* Trường nhập số lượng PromDetails */}
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

      {/* Render các trường PromDetails */}
      {showPromDetailsForm && (
        <>
          {promDetails.map((detail, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h4>PromDetail {index + 1}</h4>
              <Form.Item label="Text">
                <Input.TextArea
                  value={detail.text}
                  onChange={(e) =>
                    handlePromDetailChange(index, "text", e.target.value)
                  }
                  placeholder="Nhập text cho PromDetail"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Form.Item>
              <QuillEditorItem
                label="Image"
                value={detail.image}
                onChange={(value) =>
                  handlePromDetailChange(index, "image", value)
                }
              />
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
