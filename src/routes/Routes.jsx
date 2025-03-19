import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation  } from "react-router-dom";
import PromptList from "../components/admin/Prompt/PromptList";
import CategoryManager from "../components/admin/Category/CategoryAdmin";
import AdminLayout from "../pages/admin/AdminLayout";
import PromptLibrary from "../components/user/Prompt/PromptLibrary";
import UserLayout from "../pages/user/UserLayout/UserLayout";
import Pricing from "../components/user/Pricing/Pricing";
import Contact from "../components/user/Contact/Contact";
import UserHome from "../components/user/UserHome/Home";
import Home from "../pages/user/Home";
import ContactManager from "../components/admin/Contact/ContactAdmin";
import Login from "../pages/user/Login";
import Register from "../pages/user/register";
import SubscriptionManager from "../components/admin/Subscription";
import ListPrompts from "../components/user/Prompt/ListPrompts/ListPrompts";
import DetailPrompt from "../components/user/Prompt/DetailPrompt/DetailPrompt";
import BlogLayout from "../pages/user/Blog";
import { UserContext } from "../context/AuthContext";
import BlogManager from "../components/admin/Blog";
import BlogCategoryManager from "../components/admin/BlogCategory";
import BlogDetailPage from "../pages/user/Blog/Detail";
import TopicAdmin from "../components/admin/Topic";
import ProductComponent from "../pages/user/Product";
import ProductManager from "../components/admin/Product";
import InfoUser from "../components/user/Infomation/InfoUser";
import GeneratePrompt from "../pages/user/ToolsPage/GeneratePrompt/GeneratePrompt";
import api from "../services/api";
const RoutesMain = () => {
  //Giả sử có một cách để xác định role (có thể từ context/redux store)
  const { user, setUser } = useContext(UserContext); // Lấy user từ Context API
  const isAdmin = user && user.role === 2; // Kiểm tra role
  // const isAdmin = true; // Thay đổi logic này theo cách bạn xác định role
  console.log(isAdmin);
  const location = useLocation();
  useEffect(() => {
    document.title = "Promp";
  }, []);
  useEffect(() => {
    if (user) {
      GetUserInfo();  // Gọi lại hàm mỗi khi người dùng chuyển trang
    }
  }, [location.pathname]);
  const GetUserInfo = async () => {
    const res = await api.getUserInfo(user.id);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const updatedUser = {
      ...currentUser,
      count_prompt: res.data?.data?.user?.count_promt,
      updated_at: res.data?.data?.user?.updated_at,
      userSub: res.data?.data?.userSub
    };
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      const userUpdatedDate = new Date(user.updated_at).toISOString().split('T')[0]; // Get user's updated_at date in YYYY-MM-DD format
      if (userUpdatedDate !== currentDate) {
        const res = await api.getUserInfo(user.id);
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const updatedUser = {
          ...currentUser,
          count_prompt: res.data?.data?.user?.count_promt,
          updated_at: res.data?.data?.user?.updated_at,
          userSub: res.data?.data?.userSub
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
    }
  }
  return (
    <Routes>
      {isAdmin ? (
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="topic" element={<TopicAdmin />} />
          <Route path="prompt" element={<PromptList />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="contact" element={<ContactManager />} />
          <Route path="sub" element={<SubscriptionManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="blogcategory" element={<BlogCategoryManager />} />
          <Route path="products" element={<ProductManager />} />
        </Route>
      ) : (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<ProductComponent />} />
          <Route path="prompts" element={<PromptLibrary />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="prompts/list-prompts" element={<ListPrompts />} />
          <Route path="prompts/detail-prompts/:id" element={<DetailPrompt />} />
          <Route path="signup" element={<Register />} />
          <Route path="blog" element={<BlogLayout />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          {user && <Route path="user-information" element={<InfoUser />} />}
          <Route path="generate-prompt" element={<GeneratePrompt />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesMain;
