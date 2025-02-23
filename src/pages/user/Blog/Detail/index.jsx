import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDetail from "./detail";
import api from "../../../../services/api";
import img from "../../../../asset/imgae/1.png";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        console.log("object");
        const response = await api.getBlogById(id);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <BlogDetail blog={blog} />;
};

export default BlogDetailPage;
