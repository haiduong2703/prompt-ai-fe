// src/components/PromptDetail.jsx
import React, { useState, useEffect } from "react";
import { Descriptions, Tag, Space, Divider, Spin, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import api from "../../../services/api";

const PromptDetail = ({ promptId }) => {
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromptDetail();
  }, [promptId]);

  const fetchPromptDetail = async () => {
    try {
      setLoading(true);
      const response = await api.getPromptById(promptId);
      setPrompt(response.data);
    } catch (error) {
      message.error("Failed to fetch prompt details");
      console.error(error);
    } finally {
      setLoading(false);
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

  if (!prompt) {
    return <div>Prompt not found</div>;
  }
  const getType = (type) => {
    switch (type) {
      case 1:
        return "Free";
      case 2:
        return "Premium";
      case 3:
        return "Plus";
      default:
        return "Free";
    }
  };
  return (
    <div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Tiêu đề" span={2}>
          {prompt.title}
        </Descriptions.Item>
        <Descriptions.Item label="Thể loại">
          {prompt.Category?.name || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Mức độ bài viết">
          {prompt.is_type === 1 ? getType(prompt.is_type) : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {new Date(prompt.created_at).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhập">
          {new Date(prompt.updated_at).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left" style={{ marginLeft: 0 }}></Divider>
      <h3>Mô tả ngắn</h3>
      <p>{prompt.short_description}</p>
      <Divider orientation="left" style={{ marginLeft: 0 }}></Divider>
      <h3>Nội dung</h3>
      <div data-color-mode="light">
        <MDEditor.Markdown source={prompt.content} />
      </div>
    </div>
  );
};

export default PromptDetail;
