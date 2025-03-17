import React from "react";
import "./index.css";
import notionLogo from "../../../asset/imgae/notilogo.png";
import chatProduct from "../../../asset/imgae/chatproduct.jpg";
const ProductComponent = () => {
  const items = [
    {
      id: 1,
      title: "5000+ Top AI Tools Directory",
      status: "Premium",
      image: chatProduct,
    },
    {
      id: 2,
      title: "5000+ Top AI Tools Directory",
      status: "Free",
      image: chatProduct,
    },
    {
      id: 3,
      title: "5000+ Top AI Tools Directory",
      status: "Premium",
      image: chatProduct,
    },
    {
      id: 4,
      title: "5000+ Top AI Tools Directory",
      status: "Free",
      image: chatProduct,
    },
    {
      id: 5,
      title: "5000+ Top AI Tools Directory",
      status: "Premium",
      image: chatProduct,
    },
    {
      id: 6,
      title: "5000+ Top AI Tools Directory",
      status: "Free",
      image: chatProduct,
    },
    {
      id: 7,
      title: "5000+ Top AI Tools Directory",
      status: "Premium",
      image: chatProduct,
    },
    {
      id: 8,
      title: "5000+ Top AI Tools Directory",
      status: "Free",
      image: chatProduct,
    },
  ];

  return (
    <div className="container-product">
      <div className="header-product">
        <h1>The Biggest Collection of AI Resources</h1>
        <p>
          Click on 'Access in Notion' below to access your purchased digital
          products.
        </p>
      </div>

      {/* <div className="filter-section-product">
        <div className="filter-buttons-product">
          <button className="filter-button-product premium active">
            <span className="icon-product">⭐</span>
            Premium
          </button>
          <button className="filter-button-product free">
            <span className="icon-product">♡</span>
            Free
          </button>
        </div>
        <div className="filter-tags-product">
          <div className="tag-group-product">
            <button className="tag-product active">All</button>
            <button className="tag-product">ChatGPT</button>
            <button className="tag-product">Midjourney</button>
            <button className="tag-product">Free</button>
            <button className="tag-product newest">
              Newest
              <span className="dot-product"></span>
            </button>
          </div>
        </div>
      </div> */}

      <div className="items-grid-product">
        {items.map((item) => (
          <div key={item.id} className="item-card-product">
            <div className="card-header-product">
              <div className="status-badge-product">
                <span className="icon-product">
                  {item.status === "Premium" ? "⭐" : "♡"}
                </span>
                <span className="status-text-product">{item.status}</span>
              </div>
            </div>
            <div className="card-content-product">
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                {" "}
                <div className="image-wrapper-product">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image-product"
                  />
                </div>
                <h3>{item.title}</h3>
              </div>
              <button className="access-button-product">
                <img
                  src={notionLogo}
                  alt="Notion"
                  className="notion-icon-product"
                />
                Access in Notion
                <span className="arrow-product">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
