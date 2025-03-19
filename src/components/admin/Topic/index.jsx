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
const TopicAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    fetchCategories();
  }, [page, pageSize]);

  const fetchCategories = async () => {
    try {
      const response = await api.getTopicsPage(page, pageSize);
      setCategories(response.data.topics);
      setTotal(response.data.totalItems);
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
  const handleDelete = async (id) => {
    try {
      await api.deleteTopics(id);
      message.success("Xóa thành công");
      fetchCategories();
    } catch (error) {
      message.error("Lỗi khi xóa");
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await api.updateTopics(editingCategory.id, values);
        message.success("Cập nhật thành công");
      } else {
        await api.createTopics(values);
        message.success("Thêm mới thành công");
      }
      fetchCategories();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi lưu");
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
    { title: "Tên chủ đề", dataIndex: "name", key: "name" },

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
        <Title level={2}>Quản lý chủ đề</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Thêm mới
        </Button>
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
            label="Tên chủ đề"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input />
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
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TopicAdmin;
