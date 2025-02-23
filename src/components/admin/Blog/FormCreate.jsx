import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import api from "../../../services/api";

const CategoryFormModal = ({ visible, onClose, onSuccess, category }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  }, [category, visible]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (category) {
        await api.updateBlogCategory(category.id, values);
        message.success("Cập nhật thành công");
      } else {
        await api.createBlogCategory(values);
        message.success("Thêm mới thành công");
      }
      onSuccess();
      onClose();
    } catch (error) {
      message.error("Lỗi khi lưu");
    }
  };

  return (
    <Modal
      title={category ? "Sửa danh mục" : "Thêm danh mục"}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;
