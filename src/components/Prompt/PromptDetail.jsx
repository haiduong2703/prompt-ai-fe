// src/components/PromptDetail.jsx
import React, { useState, useEffect } from "react";
import { Descriptions, Tag, Space, Divider, Spin, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import api from "../../services/api";

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

  return (
    <div>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Title" span={2}>
          {prompt.title}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {prompt.Category?.name || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {prompt.is_type === 1 ? "Type 1" : "Type 0"}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(prompt.created_at).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(prompt.updated_at).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left" style={{ marginLeft: 0 }}>
        Short Description
      </Divider>
      <p>{prompt.short_description}</p>

      <Divider orientation="left" style={{ marginLeft: 0 }}>
        Content
      </Divider>
      <div data-color-mode="light">
        <MDEditor.Markdown source={prompt.content} />
      </div>
    </div>
  );
};

export default PromptDetail;
