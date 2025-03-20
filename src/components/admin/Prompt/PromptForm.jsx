import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form, Input, Button, Select, Spin, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../../services/api";
import QuillEditorItem from "../../QuillEditor";
const { Option } = Select;

// 🖊 Component riêng cho mỗi Form.Item chứa ReactQuill

const PromptForm = ({ topic, promptId, categories, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contentValues, setContentValues] = useState({
    content: "",
    what: "",
    tips: "",
    text: "",
    how: "",
    input: "",
    output: "",
    OptimationGuide: "",
    addtip: "",
    addinformation: "",
  });

  const isEditMode = !!promptId;

  useEffect(() => {
    if (isEditMode) {
      fetchPromptDetails();
    } else {
      form.resetFields();
      setContentValues({
        content: "",
        what: "",
        tips: "",
        text: "",
        how: "",
        input: "",
        output: "",
        OptimationGuide: "",
        addtip: "",
        addinformation: "",
      });
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
        topic_id: prompt.topic_id,
      });

      setContentValues({
        content: prompt.content,
        what: prompt.what,
        tips: prompt.tips,
        text: prompt.text,
        how: prompt.how,
        input: prompt.input,
        output: prompt.output,
        OptimationGuide: prompt.OptimationGuide,
        addtip: prompt.addtip,
        addinformation: prompt.addinformation,
      });
    } catch (error) {
      message.error("Lỗi khi lấy dữ liệu");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const promptData = { ...values, ...contentValues };

      if (isEditMode) {
        await api.updatePrompt(promptId, promptData);
        message.success("Cập nhật thành công!");
      } else {
        await api.createPrompt(promptData);
        setContentValues({
          content: "",
          what: "",
          tips: "",
          text: "",
          how: "",
          input: "",
          output: "",
          OptimationGuide: "",
          addtip: "",
          addinformation: "",
        });
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

      <Form.Item
        name="short_description"
        label="Mô tả ngắn"
        rules={[{ required: true, message: "Nhập mô tả ngắn" }]}
      >
        <Input.TextArea
          placeholder="Nhập mô tả"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>

      {/* 🖊 Không dùng map, gọi từng component riêng biệt */}
      <QuillEditorItem
        label="Nội dung"
        value={contentValues.content}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, content: value }))
        }
      />
      <Form.Item name="category_id" label="Thể loại">
        <Select placeholder="Chọn thể loại">
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="topic_id" label="Chủ đề">
        <Select placeholder="Chọn chủ đề">
          {topic.map((category) => (
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
        label="What This Prompt Does"
        value={contentValues.what}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, what: value }))
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
        label="How To Use The Prompt"
        value={contentValues.how}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, how: value }))
        }
      />
      <QuillEditorItem
        label="Example Input"
        value={contentValues.input}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, input: value }))
        }
      />
      <QuillEditorItem
        label="Example Output"
        value={contentValues.output}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, output: value }))
        }
      />

      <QuillEditorItem
        label="Additional Tips"
        value={contentValues.addtip}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, addtip: value }))
        }
      />
      <QuillEditorItem
        label="Additional Information"
        value={contentValues.addinformation}
        onChange={(value) =>
          setContentValues((prev) => ({ ...prev, addinformation: value }))
        }
      />

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          {isEditMode ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default PromptForm;
