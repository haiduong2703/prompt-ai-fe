import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/admin/Sidebar";
import Navbar from "./components/admin/Navbar";
import Dashboard from "./pages/admin/Dashboard";
import "antd/dist/antd.css";
import { useEffect } from "react";

// Component wrapper để xử lý scroll
const ScrollToTop = () => {
    const { pathname } = useLocation(); // Lấy pathname hiện tại từ react-router-dom
    console.log("pathname", pathname);
    useEffect(() => {
        window.scrollTo(0, 0); // Reset scroll về đầu trang
    }, [pathname]); // Chạy lại mỗi khi pathname thay đổi (tức là khi chuyển route)

    return null; // Không render gì cả
};

const App = () => {
    console.log("App rendered");
    return (
        <Router>
            <ScrollToTop /> {/* Thêm component này vào Router */}
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;