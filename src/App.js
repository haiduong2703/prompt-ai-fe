import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/admin/Sidebar";
import Navbar from "./components/admin/Navbar";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <Router>
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
