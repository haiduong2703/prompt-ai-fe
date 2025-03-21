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
import PromptFormMid from "./PromptFormMid";

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
  const [sections, setSections] = useState([]);
  const [topic, setTopic] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    category: null,
    status: null,
    is_type: null,
    topic: null,
  });

  // Modal states
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditModalMidVisible, setIsEditModalMidVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [currentPromptMid, setCurrentPromptMid] = useState(null);
  const [isCreateModalMidjourneyVisible, setIsCreateModalMidjourneyVisible] =
    useState(false);

  useEffect(() => {
    fetchCategories();
    fetchPrompts();
    fetchTopics();
    fetchSection();
  }, [page, pageSize, filters]);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategoriesPage(1, 1000);
      setCategories(response.data.data);
    } catch (error) {
      message.error("Failed to fetch categories");
      console.error(error);
    }
  };
  const fetchSection = async () => {
    try {
      const response = await api.getSections();
      setSections(response.data);
    } catch (error) {
      message.error("Failed to fetch section");
      console.error(error);
    }
  };
  const fetchTopics = async () => {
    try {
      const topicRes = await api.getTopics();
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
        ...(filters.is_type !== null && { is_type: filters.is_type }),
        ...(filters.topic !== null && { topic_id: filters.topic }),
      }).toString();

      const response = await api.getPrompts(query);
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
  const showCreateModalMidjourney = () => {
    setCurrentPromptMid(null);
    setIsCreateModalMidjourneyVisible(true);
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

  const handleTypeFilter = (value) => {
    setFilters({ ...filters, is_type: value });
    setPage(1);
  };

  const handleTopicFilter = (value) => {
    setFilters({ ...filters, topic: value });
    setPage(1);
  };

  // Modal handlers
  const showCreateModal = () => {
    setCurrentPrompt(null);
    setCurrentPromptMid(null);
    setIsCreateModalVisible(true);
  };

  const showEditModal = (prompt) => {
    if (prompt.Category.section_id === 1) {
      setCurrentPrompt(prompt);
      setIsEditModalVisible(true);
    } else {
      setCurrentPromptMid(prompt);
      setIsEditModalMidVisible(true);
    }
    // setCurrentPromptMid(null);
  };

  const showViewModal = (prompt) => {
    setCurrentPrompt(prompt);
    setCurrentPromptMid(prompt);
    setIsViewModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsCreateModalVisible(false);
    setIsEditModalVisible(false);
    setIsEditModalMidVisible(false);
    setIsViewModalVisible(false);
    setIsCreateModalMidjourneyVisible(false);
    setCurrentPrompt(null);
    setCurrentPromptMid(null);
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
      title: "Chủ đề ",
      dataIndex: "topic",
      key: "topic",
      render: (topic) => topic?.name || "N/A",
    },
    {
      title: "Mức độ bài viết",
      dataIndex: "is_type",
      key: "is_type",
      render: (is_type) => (is_type === 1 ? "Free" : "Premium"),
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
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
            style={{ marginRight: 10 }}
          >
            Thêm mới ChatGPT
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModalMidjourney}
          >
            Thêm mới Midjourney
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
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
          style={{ width: 200 }}
          placeholder="Filter by topic"
          onChange={handleTopicFilter}
          allowClear
        >
          {topic.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 150 }}
          placeholder="Filter by type"
          onChange={handleTypeFilter}
          allowClear
        >
          <Option value="1">Free</Option>
          <Option value="2">Premium</Option>
        </Select>
      </div>

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
      <Modal
        title="Tạo mới Prompt mid"
        open={isCreateModalMidjourneyVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={null}
      >
        <PromptFormMid
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

      <Modal
        title="Sửa thông tin Prompt Mid"
        open={isEditModalMidVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={null}
      >
        {currentPromptMid && (
          <PromptFormMid
            promptId={currentPromptMid.id}
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
