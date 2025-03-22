import React, { useContext, useEffect, useState } from "react";
import "./Pricing.css";
import PricingCard from "./PricingCard/PricingCard";
import pricingToolImg from "../../../asset/imgae/pricing_img.png";
import pricingImgMobile from "../../../asset/imgae/pricing_img_mobile.png";
import FAQSection from "../../Q&A/FAQSection";
import api from "../../../services/api";
import { UserContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const planLabels = {
  Monthly: "Tháng",
  Yearly: "Năm",
};

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [dataSub, setDataSub] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // fetchDataSub(selectedPlan);
  }, [selectedPlan]);
  const fetchDataSub = async () => {
    try {
      const resp = await api.getSubDuration(selectedPlan);
      setDataSub(resp.data);
    } catch (error) {}
  };
  return (
    <div className="user-pricing-container">
      <div className="user-pricing-header">
        <h1>
          Hiệu suất vượt trội với
          <br /> gói Prom phù hợp!
        </h1>
        <p>Nâng cấp để truy cập KHÔNG GIỚI HẠN thư viện Prompt cao cấp</p>

        {/* Tab chọn gói với hiệu ứng động */}
        {/* <div className={`user-pricing-header-options ${selectedPlan.toLowerCase()}`}>
          {Object.keys(planLabels).map((plan) => (
            <button
              key={plan}
              className={selectedPlan === plan ? "active" : ""}
              onClick={() => setSelectedPlan(plan)}
            >
              {planLabels[plan]}
            </button>
          ))}
        </div>

        <p><span className="discount-text">Tiết kiệm 33%</span> khi đăng ký gói năm</p> */}
      </div>

      <div className="user-pricing-list-card">
        {dataSub.length > 0 ? (
          dataSub.map((sub, index) => (
            <PricingCard
              key={sub.id}
              id={sub.id}
              type={sub.type}
              title={sub.name_sub}
              price={sub.price}
              period="tháng"
              features={{
                description: sub.description || "Không có mô tả",
                items:
                  sub.ContentSubscriptions?.map((item) => ({
                    text: item.content,
                    included: item.included,
                  })) || [],
              }}
              buttonText={
                user === null
                  ? "Đăng ký"
                  : sub.type === user?.userSub?.subscription?.type
                  ? "Hiện tại"
                  : user !== null && sub.name_sub === "Free"
                  ? "Mặc định"
                  : "Nâng cấp"
              }
              isPopular={sub.is_popular}
            />
          ))
        ) : (
          <p>Chưa có thông tin gói dịch vụ...</p>
        )}
      </div>
      <div className="user-pricing-card-list-tools">
        <Link to="/product">
          <img src={isMobile ? pricingImgMobile : pricingToolImg} alt="" />
        </Link>
      </div>
      <div className="user-pricing-faq">
        <FAQSection />
      </div>
    </div>
  );
};

export default Pricing;
