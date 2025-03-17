import React, { useState, useEffect, useRef, useMemo } from "react";
import { Form, Input, Button, Select, Spin, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../services/api";
const QuillEditorItem = ({ label, value, onChange }) => {
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await api.uploadImage(formData);
          const url = response.data.imageUrls[0];
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", url);
        } catch (error) {
          message.error("Lỗi khi upload ảnh");
          console.error(error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Form.Item label={label}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        onFocus={() => {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            setTimeout(() => {
              quill.focus();
            }, 0);
          }
        }}
      />
    </Form.Item>
  );
};
export default QuillEditorItem;
