import React, { useState, useEffect, useRef, useMemo } from "react";
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
} from "antd";
import axios from "axios";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import api from "../../../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles for ReactQuill

const { Title } = Typography;
const { Option } = Select;

const SubscriptionManager = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [description, setDescription] = useState(""); // State for ReactQuill
  const quillRef = useRef(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.getSubPage(page, pageSize);
      setCategories(response.data.data);
      setTotal(response.data.totalPages);
    } catch (error) {
      message.error("Lỗi khi tải danh sách danh mục");
    }
  };
  const formatDuration = (duration) => {
    switch (duration) {
      case 1:
        return "Tháng";
      case 2:
        return "Vĩnh viễn";
      default:
        return "Không xác định";
    }
  };

  // Hàm format type
  const formatType = (type) => {
    switch (type) {
      case 1:
        return "Free";
      case 2:
        return "Premium";
      default:
        return "Không xác định";
    }
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setDescription(""); // Reset description
    setIsModalOpen(true);
  };

  const showViewModal = (category) => {
    form.setFieldsValue(category);
    setIsViewModalVisible(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setDescription(category.description); // Set description for editing
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    form.resetFields();
    setDescription(""); // Reset description
    setIsViewModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteSub(id);
      message.success("Xóa thành công");
      fetchCategories();
    } catch (error) {
      message.error("Lỗi khi xóa");
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      values.description = description; // Add description from ReactQuill

      if (editingCategory) {
        await api.updateSub(editingCategory.id, values);
        message.success("Cập nhật thành công");
      } else {
        await api.createBlog({
          ...values,
          type: Number(values.type),
          duration: Number(values.duration),
        });
        message.success("Thêm mới thành công");
      }
      form.resetFields();
      setDescription(""); // Reset description
      fetchCategories();

      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi lưu");
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }], // Chọn font chữ
          [{ size: ["small", false, "large", "huge"] }], // Cỡ chữ
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Tiêu đề

          ["bold", "italic", "underline", "strike"], // Định dạng chữ
          [{ color: [] }, { background: [] }], // Màu chữ & nền
          [{ script: "sub" }, { script: "super" }], // Chỉ số trên/dưới

          [{ list: "ordered" }, { list: "bullet" }], // Danh sách
          [{ indent: "-1" }, { indent: "+1" }], // Thụt lề
          [{ align: [] }], // Căn lề trái/phải/giữa/justify

          ["blockquote", "code-block"], // Trích dẫn, đoạn code
          //   ["link", "image", "video"], // Chèn link, ảnh, video
          [{ table: true }], // Chèn bảng (cần cài thêm module quill-table)

          ["clean"], // Xóa định dạng
          ["undo", "redo"], // Hoàn tác/Làm lại (cần bổ sung custom handler)
        ],
      },
    }),
    []
  );

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => {
        return (page - 1) * pageSize + index + 1;
      },
    },
    { title: "Tên gói", dataIndex: "name_sub", key: "name_sub" },
    // { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Loại gói",
      dataIndex: "type",
      key: "type",
      render: (type) => formatType(type),
    },
    {
      title: "Thời hạn",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => formatDuration(duration),
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (price) => formatPrice(price),
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
        <Title level={2}>Quản lý gói đăng ký</Title>
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
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        width="60%"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name_sub"
            label="Tên gói"
            rules={[{ required: true, message: "Vui lòng nhập tên gói" }]}
          >
            <Input />
          </Form.Item>
          <label>Mô tả</label>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            key={isModalOpen ? "new" : editingCategory?.id} // Thay đổi key khi mở modal
            theme="snow"
            value={description || ""} // Đảm bảo giá trị không bị undefined hoặc null
            onChange={(value, delta, source, editor) => {
              setDescription(editor.getHTML()); // Lấy nội dung HTML
            }}
          />
          <Form.Item
            name="price"
            label="Giá gói"
            rules={[{ required: true, message: "Vui lòng nhập giá gói" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Thời gian sử dụng"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian sử dụng" },
            ]}
          >
            <Select>
              <Select.Option value="1">Tháng</Select.Option>
              <Select.Option value="2">Vĩnh viễn</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại gói"
            rules={[{ required: true, message: "Vui lòng chọn loại gói" }]}
          >
            <Select>
              <Select.Option value="1">Free</Select.Option>
              <Select.Option value="2">Premium</Select.Option>
            </Select>
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
            name="name_sub"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <div
              style={{
                //border: "1px solid #d9d9d9",
                padding: "10px",
                minHeight: "100px",
                //   background: "#f5f5f5",
              }}
              dangerouslySetInnerHTML={{
                __html: form.getFieldValue("description"),
              }}
            />
          </Form.Item>
          <Form.Item name="price" label="Giá gói">
            <Input disabled value={formatPrice(form.getFieldValue("price"))} />
          </Form.Item>
          <Form.Item name="duration" label="Thời gian sử dụng">
            <Input
              disabled
              value={formatDuration(form.getFieldValue("duration"))}
            />
          </Form.Item>

          <Form.Item name="type" label="Loại gói">
            <Input disabled value={formatType(form.getFieldValue("type"))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionManager;
