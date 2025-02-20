// src/components/PromptForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Select, Switch, Spin, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import api from "../../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Đảm bảo import CSS để hiển thị đúng
const { Option } = Select;

const PromptForm = ({ promptId, categories, onSuccess }) => {
  const [form] = Form.useForm();
  const quillRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isType, setIsType] = useState([
    {
      label: "Free",
      value: 1,
    },
    {
      label: "Premium",
      value: 2,
    },
    {
      label: "Plus",
      value: 3,
    },
  ]);
  const [markdownContent, setMarkdownContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isEditMode = !!promptId;
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    if (isEditMode) {
      fetchPromptDetails();
    } else {
      // Reset form for create mode
      form.resetFields();
      setMarkdownContent("");
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
        is_type: prompt.is_type === 1,
        status: prompt.status === 1,
      });
      setHtmlContent(prompt.content);
      setMarkdownContent(prompt.content);
    } catch (error) {
      message.error("Failed to fetch prompt details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const promptData = {
        ...values,
        content: htmlContent,
        is_type: values.is_type ? 1 : 0,
        status: values.status ? 1 : 0,
      };

      if (isEditMode) {
        await api.updatePrompt(promptId, promptData);
        message.success("Prompt updated successfully");
      } else {
        await api.createPrompt(promptData);
        setHtmlContent("");
        message.success("Prompt created successfully");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(
        isEditMode ? "Failed to update prompt" : "Failed to create prompt"
      );
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
  // Xử lý upload ảnh
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", reader.result);
      };

      if (file) {
        reader.readAsDataURL(file); // Đọc file dưới dạng base64 (hoặc upload lên server)
      }
    };
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        is_type: true,
        status: true,
      }}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: "Please enter the title" }]}
      >
        <Input placeholder="Nhập tiêu đề" />
      </Form.Item>

      <Form.Item
        name="short_description"
        label="Mô tả ngắn"
        rules={[
          { required: true, message: "Vui lfong nhập mô tả ngắn" },
          { max: 500, message: "Mô tả ngắn ít hơn 500 từ" },
        ]}
      >
        <Input.TextArea
          placeholder="Nhập mô tả ngắn"
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item label="Nội dung" required>
        <ReactQuill
          ref={quillRef}
          value={htmlContent}
          onChange={setHtmlContent}
          theme="snow"
          modules={modules}
        />
      </Form.Item>
      {/* <Form.Item
        label="Nội dung"
        required
        rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
      >
        <MDEditor
          value={markdownContent}
          onChange={setMarkdownContent}
          height={300}
          preview="edit"
        />
      </Form.Item> */}

      <Form.Item name="category_id" label="Thể loại">
        <Select placeholder="Chọn thể loại">
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="is_type" label="Mức độ bài viết">
        <Select placeholder="Chọn kiểu">
          {isType.map((type) => (
            <Option key={type.value} value={type.value}>
              {type.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          {isEditMode ? "Cập nhập" : "Tạo mới"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PromptForm;
