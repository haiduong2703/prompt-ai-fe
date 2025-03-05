// src/components/PromptList.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Input,
  Select,
  Typography,
  Tag,
  Popconfirm,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import api from "../../../services/api";
import PromptForm from "./PromptForm";
import PromptDetail from "./PromptDetail";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState([]);
  const [topic, setTopic] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    category: null,
    status: null,
  });

  // Modal states
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchPrompts();
    fetchTopics();
  }, [page, pageSize, filters]);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response.data.data);
    } catch (error) {
      message.error("Failed to fetch categories");
      console.error(error);
    }
  };
  const fetchTopics = async () => {
    try {
      const topicRes = await api.getTopics();
      console.log(topicRes.data);
      setTopic(topicRes.data);
    } catch (error) {
      message.error("Failed to fetch categories");
      console.error(error);
    }
  };
  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        pageSize,
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category_id: filters.category }),
        ...(filters.status !== null && { status: filters.status }),
      }).toString();

      const response = await api.getPrompts(page, pageSize);
      setPrompts(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      message.error("Failed to fetch prompts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deletePrompt(id);
      message.success("Prompt deleted successfully");
      fetchPrompts();
    } catch (error) {
      message.error("Failed to delete prompt");
      console.error(error);
    }
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setPage(1);
  };

  const handleCategoryFilter = (value) => {
    setFilters({ ...filters, category: value });
    setPage(1);
  };

  const handleStatusFilter = (value) => {
    setFilters({ ...filters, status: value });
    setPage(1);
  };

  // Modal handlers
  const showCreateModal = () => {
    setCurrentPrompt(null);
    setIsCreateModalVisible(true);
  };

  const showEditModal = (prompt) => {
    setCurrentPrompt(prompt);
    setIsEditModalVisible(true);
  };

  const showViewModal = (prompt) => {
    setCurrentPrompt(prompt);
    setIsViewModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsCreateModalVisible(false);
    setIsEditModalVisible(false);
    setIsViewModalVisible(false);
    setCurrentPrompt(null);
  };

  const handleFormSuccess = () => {
    handleModalCancel();
    fetchPrompts();
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => {
        return (page - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <a onClick={() => showViewModal(record)}>{text}</a>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "Category",
      key: "category",
      render: (category) => category?.name || "N/A",
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "short_description",
      key: "short_description",
      //render: (category) => category?.name || "N/A",
    },
    // {
    //   title: "Views",
    //   dataIndex: "views",
    //   key: "views",
    // },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(),
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
            onClick={() => showEditModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this prompt?"
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
        <Title level={2}>Quản lý Prompts</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Thêm mới
        </Button>
      </div>

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

      <Table
        columns={columns}
        dataSource={prompts}
        rowKey="id"
        loading={loading}
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

      {/* Create Modal */}
      <Modal
        title="Tạo mới Prompt"
        open={isCreateModalVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={null}
      >
        <PromptForm
          categories={categories}
          topic={topic}
          onSuccess={handleFormSuccess}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Sửa thông tin Prompt"
        open={isEditModalVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={null}
      >
        {currentPrompt && (
          <PromptForm
            promptId={currentPrompt.id}
            categories={categories}
            topic={topic}
            onSuccess={handleFormSuccess}
          />
        )}
      </Modal>

      {/* View Modal */}
      <Modal
        title="Thông tin Prompts"
        open={isViewModalVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
          currentPrompt && (
            <Button
              key="edit"
              type="primary"
              onClick={() => {
                handleModalCancel();
                showEditModal(currentPrompt);
              }}
            >
              Sửa
            </Button>
          ),
        ]}
      >
        {currentPrompt && <PromptDetail promptId={currentPrompt.id} />}
      </Modal>
    </div>
  );
};

export default PromptList;
