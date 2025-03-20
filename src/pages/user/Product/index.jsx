import React, { useState, useEffect } from "react";
import "./index.css";
import notionLogo from "../../../asset/imgae/notilogo.png";
import chatProduct from "../../../asset/imgae/chatproduct.jpg";
import api from "../../../services/api"; // Giả sử bạn có file api.js để gọi API
import { Pagination } from "antd";
import arrow_prev from "../../../asset/icon/arrow_prev.png";
import arrow_next from "../../../asset/icon/arrow_next.png";
const ProductComponent = () => {
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State để xử lý trạng thái loading
  const [error, setError] = useState(null); // State để xử lý lỗi
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts(currentPage, pageSize); // Gọi API getProducts
        setProducts(response.data.data); // Cập nhật dữ liệu vào state
        setTotalPages(response.data.total);
        console.log("data", response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setLoading(false); // Tắt trạng thái loading
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false); // Tắt trạng thái loading dù có lỗi
      }
    };

    fetchProducts();
  }, [currentPage, totalPages]); // Chỉ chạy 1 lần khi component mount

  // Xử lý giao diện khi đang loading
  if (loading) {
    return <div>Loading products...</div>;
  }

  // Xử lý giao diện khi có lỗi
  if (error) {
    return <div>{error}</div>;
  }
  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="container-product">
      <div className="header-product">
        <h1>Kho Tài Liệu AI</h1>
        <p>
          Nhấp vào 'Truy cập trong Notion' bên dưới để truy cập các sản phẩm số
          mà bạn đã mua
        </p>
      </div>

      <div className="items-grid-product">
        {products.map((item) => (
          <div key={item.id} className="item-card-product">
            <div className="card-header-product">
              <div className="icon-product-container">
                <img src={item?.Section?.description} alt="" />
              </div>
              <div className="status-badge-product">
                <p className="icon-product">
                  {/* {item.status === "Premium" ? "⭐" : "♡"} */}
                  Free
                </p>
                {/* <span className="status-text-product">{item.status}</span> */}
              </div>
            </div>
            <div className="card-content-product">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <div className="image-wrapper-product">
                  <img
                    src={item.image || chatProduct} // Dùng ảnh mặc định nếu API không trả về image
                    alt={item.name}
                    className="card-image-product"
                  />
                </div>
                <h3>{item.name}</h3>
              </div>
              {item.link ? (
                <a
                  href={item.link}
                  className="access-button-product"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={notionLogo}
                    alt="Notion"
                    className="notion-icon-product"
                  />
                  Truy Cập Notion
                  <span className="arrow-product">→</span>
                </a>
              ) : (
                <span className="access-button-product disabled">
                  <img
                    src={notionLogo}
                    alt="Notion"
                    className="notion-icon-product"
                  />
                  Truy Cập Notion
                  <span className="arrow-product">→</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        className="pagination_list_prompts"
        current={currentPage}
        total={totalPages}
        pageSize={pageSize}
        onChange={handleChangePage}
        showSizeChanger={false}
        itemRender={(_, type, originalElement) => {
          if (type === "prev") {
            return (
              <button className="pagination-arrow-btn prev">
                <img src={arrow_prev} alt="Previous" />
              </button>
            );
          }
          if (type === "next") {
            return (
              <button className="pagination-arrow-btn next">
                <img src={arrow_next} alt="Next" />
              </button>
            );
          }
          return originalElement;
        }}
      />
    </div>
  );
};

export default ProductComponent;
