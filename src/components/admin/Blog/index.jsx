import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Typography,
  Popconfirm,
  Space,
  Select,
  Upload,
  Switch,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for React Quill
import axios from "axios";
import api from "../../../services/api";

const { Title } = Typography;
const { Option } = Select;

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [page, pageSize]);

  const fetchBlogs = async () => {
    try {
      const response = await api.getBlogPage(page, pageSize, "");
      setBlogs(response.data.blogs);
      setTotal(response.data.totalItems);
    } catch (error) {
      message.error("Lỗi khi tải danh sách bài viết");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.getBlogCategory();
      setCategories(response.data);
    } catch (error) {
      message.error("Lỗi khi tải danh mục");
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.deleteBlog(id);
      message.success("Xóa bài viết thành công");
      fetchBlogs();
    } catch (error) {
      message.error("Lỗi khi xóa bài viết");
    }
  };
  const showViewModal = (blog) => {
    setImageUrl(blog.featured_image);
    form.setFieldsValue({
      ...blog,
      category_id: blog.category?.name,
      content_show: blog.content,
    });
    setIsViewModalVisible(true);
  };
  const handleAdd = () => {
    setEditingBlog(null);
    setImageUrl("");
    setFileList([]);
    setEditorContent(""); // Đặt lại nội dung khi thêm mới
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setImageUrl(blog.featured_image);
    setFileList(
      blog.featured_image
        ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: blog.featured_image,
            },
          ]
        : []
    );
    setEditorContent(blog.content || ""); // Gán nội dung khi chỉnh sửa
    setContent(blog.content);
    form.setFieldsValue({
      ...blog,
      category_id: blog.category_id,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "featured_image") {
          if (fileList[0]?.originFileObj) {
            formData.append(key, fileList[0].originFileObj);
          }
        } else {
          formData.append(key, values[key]);
        }
      });
      formData.append("content", content); // Thêm nội dung vào FormData
      if (editingBlog) {
        await api.updateBlog(editingBlog.id, formData);
        message.success("Cập nhật bài viết thành công");
      } else {
        await api.createBlog(formData);
        message.success("Thêm bài viết thành công");
      }

      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      message.error("Lỗi khi lưu bài viết");
      console.error(error);
    }
  };
  const [content, setContent] = useState(""); // Lưu nội dung dưới dạng HTML string

  const handleChange = (value) => {
    setContent(value); // Giá trị của ReactQuill trả về là một HTML string
  };
  const uploadProps = {
    maxCount: 1,
    fileList: fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ có thể tải lên file ảnh!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Ảnh phải nhỏ hơn 5MB!");
        return false;
      }
      return false; // Return false to prevent auto upload
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      if (newFileList.length > 0 && newFileList[0].originFileObj) {
        // Create preview URL only for valid file
        const url = URL.createObjectURL(newFileList[0].originFileObj);
        setImageUrl(url);
        // Clean up the old URL
        return () => URL.revokeObjectURL(url);
      } else {
        setImageUrl("");
      }
    },
    onRemove: () => {
      setImageUrl("");
      setFileList([]);
    },
  };
  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Ảnh",
      key: "featured_image",
      render: (_, record) =>
        record.featured_image ? (
          <img
            src={record.featured_image}
            alt="thumbnail"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "Không có ảnh"
        ),
    },
    { title: "Tiêu đề", dataIndex: "title", key: "title" },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (category) => category?.name,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "published" ? "#52c41a" : "#faad14",
          }}
        >
          {status === "published" ? "Đã xuất bản" : "Bản nháp"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showViewModal(record)}
          >
            Xem
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa bài viết này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={2}>Quản lý bài viết</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm mới
        </Button>
      </div>

      <Table
        dataSource={blogs}
        columns={columns}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} bản ghi`,
        }}
      />

      <Modal
        title={editingBlog ? "Sửa bài viết" : "Thêm bài viết"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        width={1000}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category_id"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="featured_image" label="Ảnh đại diện">
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="preview"
                style={{
                  marginTop: 8,
                  maxWidth: 200,
                  maxHeight: 200,
                  objectFit: "cover",
                }}
              />
            )}
          </Form.Item>

          <ReactQuill value={content} onChange={handleChange} />

          <Form.Item
            name="meta_description"
            label="Mô tả meta"
            rules={[{ required: true, message: "Vui lòng nhập mô tả meta" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chi tiết bài viết"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={1000}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề">
            <Input disabled />
          </Form.Item>

          <Form.Item name="category_id" label="Danh mục">
            <Select disabled>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {imageUrl && (
            <Form.Item label="Ảnh đại diện">
              <img
                src={imageUrl}
                alt="preview"
                style={{
                  maxWidth: 200,
                  maxHeight: 200,
                  objectFit: "cover",
                }}
              />
            </Form.Item>
          )}

          <Form.Item name="content_show" label="Nội dung">
            <ReactQuill theme="snow" readOnly />
          </Form.Item>

          <Form.Item name="meta_description" label="Mô tả meta">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManager;
