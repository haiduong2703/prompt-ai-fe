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
  Tag,
} from "antd";
import axios from "axios";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
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
  const [idReply, setIdReply] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("helloo");
      const response = await api.getContactsPage(page, pageSize);
      setCategories(response.data.data);
      setTotal(response.data.totalPages);
    } catch (error) {
      message.error("Lỗi khi tải danh sách danh mục");
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };
  const showViewModal = (category) => {
    form.setFieldsValue(category);
    setIdReply(category.id);
    setIsViewModalVisible(true);
  };
  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsViewModalVisible(false);
  };
  const handleDelete = async (id) => {};
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return <Tag color="red">Chưa phản hồi</Tag>;
      case 2:
        return <Tag color="green">Đã phản hồi</Tag>;
      default:
        return <Tag color="red">Chưa phản hồi</Tag>;
    }
  };
  const handleSave = async () => {};
  const handleReply = async () => {
    try {
      const values = await form.validateFields();
      const { id } = form.getFieldsValue();

      await api.repContacts(idReply, values.reply);
      message.success("Phản hồi thành công");
      setIsViewModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error("Lỗi khi phản hồi");
    }
  };
  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => {
        return (page - 1) * pageSize + index + 1;
      },
    },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return getStatus(record.status);
      },
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
        <Title level={2}>Quản lý liên hệ</Title>

        {/* <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
          <Search
            placeholder="Search prompts"
            onSearch={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            style={{ width: 200 }}
            placeholder="Filter by category"
            onChange={handleCategoryFilter}
            allowClear
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
          <Select
            style={{ width: 150 }}
            placeholder="Filter by status"
            onChange={handleStatusFilter}
            allowClear
          >
            <Option value={1}>Active</Option>
            <Option value={0}>Inactive</Option>
          </Select>
        </div> */}
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
        onCancel={() => setIsModalOpen(false)}
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
        </Form>
      </Modal>
      <Modal
        title="Thông tin liên hệ"
        open={isViewModalVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="edit" type="primary" onClick={handleReply}>
            Phản hồi
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="message" label="Nội dung">
            <Input.TextArea disabled />
          </Form.Item>
          <Form.Item name="reply" label="Nội dung phản hồi">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
