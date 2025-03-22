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
  Upload,
  Image,
} from "antd";
import axios from "axios";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import api from "../../../services/api";

const { Title } = Typography;

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [imageFile, setImageFile] = useState(null); // Lưu file ảnh (binary)
  const [imageCardFile, setImageCardFile] = useState(null); // Lưu file ảnh thẻ (binary)
  const [imageUrl, setImageUrl] = useState(null); // Lưu URL preview
  const [imageCardUrl, setImageCardUrl] = useState(null); // Lưu URL preview
  const [fileList, setFileList] = useState([]);
  const [fileListCard, setFileListCard] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [page, pageSize]);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategoriesPage(page, pageSize);
      setCategories(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      message.error("Lỗi khi tải danh sách danh mục");
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setImageFile(null);
    setImageCardFile(null);
    setImageUrl(null);
    setImageCardUrl(null);
    setFileList([]);
    setFileListCard([]);
    setIsModalOpen(true);
  };

  const showViewModal = (category) => {
    form.setFieldsValue(category);
    setImageUrl(category.image);
    setImageCardUrl(category.image_card);
    setIsViewModalVisible(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setImageUrl(category.image);
    setImageCardUrl(category.image_card);
    setImageFile(null);
    setImageCardFile(null);
    setFileList([]);
    setFileListCard([]);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setIsViewModalVisible(false);
    setImageFile(null);
    setImageCardFile(null);
    setImageUrl(null);
    setImageCardUrl(null);
    setFileList([]);
    setFileListCard([]);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteCategory(id);
      message.success("Xóa thành công");
      fetchCategories();
    } catch (error) {
      message.error("Lỗi khi xóa");
    }
  };

  const handleFileChange = (info, field) => {
    const file = info.file; // Lấy file từ Upload của Ant Design
    if (file) {
      // Tạo URL preview ngay lập tức
      const previewUrl = URL.createObjectURL(file);
      if (field === "image") {
        setImageFile(file);
        setImageUrl(previewUrl); // Sử dụng URL.createObjectURL để preview
      } else {
        setImageCardFile(file);
        setImageCardUrl(previewUrl); // Sử dụng URL.createObjectURL để preview
      }

      // Dọn dẹp URL object khi component unmount
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Thêm các trường thông thường vào FormData
      Object.keys(values).forEach((key) => {
        if (key !== "image" && key !== "image_card") {
          formData.append(key, values[key]);
        }
      });

      // Debug: Kiểm tra file trước khi thêm vào FormData
      console.log("Image File:", imageFile);
      console.log("Image Card File:", imageCardFile);

      // Upload ảnh khi nhấn Lưu - đảm bảo gửi đúng đối tượng File
      if (imageFile) {
        console.log("Image file type:", imageFile.type);
        console.log("Image file name:", imageFile.name);
        console.log("Image file size:", imageFile.size);
        formData.append("image", imageFile, imageFile.name);
      }

      if (imageCardFile) {
        console.log("Image card file type:", imageCardFile.type);
        console.log("Image card file name:", imageCardFile.name);
        console.log("Image card file size:", imageCardFile.size);
        formData.append("image_card", imageCardFile, imageCardFile.name);
      }

      // Kiểm tra nội dung của FormData trước khi gửi
      console.log("FormData entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (editingCategory) {
        const response = await api.updateCategories(
          editingCategory.id,
          formData
        );
        console.log("Server response:", response);
        message.success("Cập nhật thành công");
      } else {
        const response = await api.createCategories(formData);
        console.log("Server response:", response);
        message.success("Thêm mới thành công");
      }
      fetchCategories();
      handleModalCancel();
    } catch (error) {
      console.error("Error details:", error);
      message.error(
        "Lỗi khi lưu: " + (error.response?.data?.message || error.message)
      );
    }
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
        // Lưu file gốc
        const fileObj = newFileList[0].originFileObj;
        console.log("Upload image file object:", fileObj);
        // Create preview URL
        const url = URL.createObjectURL(fileObj);
        setImageUrl(url);
        setImageFile(fileObj);
      } else {
        setImageUrl("");
        setImageFile(null);
      }
    },
    onRemove: () => {
      setImageUrl("");
      setFileList([]);
      setImageFile(null);
    },
  };

  const uploadPropsCard = {
    maxCount: 1,
    fileList: fileListCard,
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
      setFileListCard(newFileList);
      if (newFileList.length > 0 && newFileList[0].originFileObj) {
        // Lưu file gốc
        const fileObj = newFileList[0].originFileObj;
        console.log("Upload image card file object:", fileObj);
        // Create preview URL
        const url = URL.createObjectURL(fileObj);
        setImageCardUrl(url);
        setImageCardFile(fileObj);
      } else {
        setImageCardUrl("");
        setImageCardFile(null);
      }
    },
    onRemove: () => {
      setImageCardUrl("");
      setFileListCard([]);
      setImageCardFile(null);
    },
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => {
        return (page - 1) * pageSize + index + 1;
      },
    },
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hình ảnh",
      key: "image",
      render: (record) => (
        <Image src={record.image} width={50} alt={record.name} />
      ),
    },
    {
      title: "Hình ảnh thẻ",
      key: "image_card",
      render: (record) => (
        <Image src={record.image_card} width={50} alt={`${record.name} card`} />
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
            title="Bạn có chắc chắn muốn xóa thể loại này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
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
        <Title level={2}>Quản lý thể loại</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Thêm mới
        </Button>
      </div>
      <Table
        dataSource={categories}
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
        title={editingCategory ? "Sửa danh mục" : "Thêm danh mục"}
        open={isModalOpen}
        onCancel={handleModalCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="section_id"
            label="Section"
            rules={[{ required: true, message: "Vui lòng nhập ID section" }]}
          >
            <Input placeholder="Nhập ID section" />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
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
          <Form.Item name="image_card" label="Hình ảnh thẻ">
            <Upload {...uploadPropsCard} listType="picture">
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {imageCardUrl && (
              <img
                src={imageCardUrl}
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
        </Form>
      </Modal>

      <Modal
        title="Thông tin thể loại"
        open={isViewModalVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên danh mục">
            <Input disabled />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea disabled />
          </Form.Item>
          <Form.Item name="section_id" label="Section">
            <Input disabled />
          </Form.Item>
          {imageUrl && (
            <Image src={imageUrl} width={100} alt="Category Image" />
          )}
          {imageCardUrl && (
            <Image src={imageCardUrl} width={100} alt="Category Card Image" />
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
