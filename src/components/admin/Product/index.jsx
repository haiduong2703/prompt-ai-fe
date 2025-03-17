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
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import api from "../../../services/api";

const { Title } = Typography;
const { Option } = Select;

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]); // State lưu danh sách sections
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSections(); // Gọi API lấy sections khi component mount
  }, [page, pageSize]);

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts(page, pageSize);
      setProducts(response.data.data || response.data);
      setTotal(response.data.total || response.data.length);
    } catch (error) {
      message.error("Lỗi khi tải danh sách sản phẩm");
    }
  };

  const fetchSections = async () => {
    try {
      const response = await api.getSections(); // Gọi API lấy sections
      setSections(response.data); // Lưu danh sách sections vào state
    } catch (error) {
      message.error("Lỗi khi tải danh sách section");
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setImageFile(null);
    setImageUrl(null);
    setFileList([]);
    setIsModalOpen(true);
  };

  const showViewModal = (product) => {
    form.setFieldsValue(product);
    setImageUrl(product.image);
    setIsViewModalVisible(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setImageUrl(product.image);
    setImageFile(null);
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setIsViewModalVisible(false);
    setImageFile(null);
    setImageUrl(null);
    setFileList([]);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      message.success("Xóa sản phẩm thành công");
      fetchProducts();
    } catch (error) {
      message.error("Lỗi khi xóa sản phẩm");
    }
  };

  const handleFileChange = (info) => {
    const file = info.file;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("link", values.link);
      formData.append("section_id", values.section_id);
      if (imageFile) formData.append("image", imageFile);

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData);
        message.success("Cập nhật sản phẩm thành công");
      } else {
        await api.createProduct(formData);
        message.success("Thêm sản phẩm thành công");
      }
      fetchProducts();
      handleModalCancel();
    } catch (error) {
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
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      if (newFileList.length > 0 && newFileList[0].originFileObj) {
        const url = URL.createObjectURL(newFileList[0].originFileObj);
        setImageUrl(url);
        setImageFile(newFileList[0].originFileObj);
        return () => URL.revokeObjectURL(url);
      } else {
        setImageUrl(null);
        setImageFile(null);
      }
    },
    onRemove: () => {
      setImageUrl(null);
      setFileList([]);
      setImageFile(null);
    },
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => (page - 1) * pageSize + index + 1,
    },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Link", dataIndex: "link", key: "link" },
    {
      title: "Hình ảnh",
      key: "image",
      render: (record) =>
        record.image ? (
          <Image src={record.image} width={50} alt={record.name} />
        ) : (
          "Không có ảnh"
        ),
    },
    { title: "Section ID", dataIndex: "section_id", key: "section_id" },
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
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
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
        <Title level={2}>Quản lý sản phẩm</Title>
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
        dataSource={products}
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
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalOpen}
        onCancel={handleModalCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="Link"
            rules={[{ required: true, message: "Vui lòng nhập link" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="section_id"
            label="Section"
            rules={[{ required: true, message: "Vui lòng chọn section" }]}
          >
            <Select placeholder="Chọn section">
              {sections.map((section) => (
                <Option key={section.id} value={section.id}>
                  {section.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            {imageUrl && (
              <Image
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
        </Form>
      </Modal>

      <Modal
        title="Thông tin sản phẩm"
        open={isViewModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên sản phẩm">
            <Input disabled />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <Input disabled />
          </Form.Item>
          <Form.Item name="section_id" label="Section">
            <Select placeholder="Chọn section" disabled>
              {sections.map((section) => (
                <Option key={section.id} value={section.id}>
                  {section.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {imageUrl && <Image src={imageUrl} width={100} alt="Product Image" />}
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManager;
