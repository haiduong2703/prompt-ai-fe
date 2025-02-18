import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PromptList from "../components/Prompt/PromptList";
import CategoryManager from "../components/Category/CategoryAdmin";
const RoutesMain = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Routes>
        <Route path="/" element={<PromptList />} />
        <Route path="/category" element={<CategoryManager />} />
      </Routes>
    </div>
  );
};

export default RoutesMain;
