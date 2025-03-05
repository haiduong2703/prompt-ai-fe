import React, { useContext, useEffect, useState } from "react";
import "./Pricing.css";
import PricingCard from "./PricingCard/PricingCard";
import pricingToolImg from "../../../asset/imgae/pricing-tools.svg"
import FAQSection from "../../Q&A/FAQSection";
import api from "../../../services/api";
import { UserContext } from "../../../context/AuthContext";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [dataSub, setDataSub] = useState([]);
  const { user } = useContext(UserContext); // Lấy user từ Context API

  useEffect(() => {
    console.log("user", user);
  }, [])
  useEffect(() => {
    fetchDataSub(selectedPlan);
  }, [selectedPlan]);
  const fetchDataSub = async () => {
    try {
      const resp = await api.getSubDuration(selectedPlan);
      setDataSub(resp.data);
    } catch (error) {

    }
  }
  return (
    <div className="user-pricing-container">
      <div className="user-pricing-header">
        <h1>Pricing To Fit Your Need</h1>
        <p>Get full access to all apps & features from only $0.33 per day - Cancel anytime</p>

        {/* Tab chọn gói với hiệu ứng động */}
        <div className={`user-pricing-header-options ${selectedPlan.toLowerCase()}`}>
          {["Yearly", "Monthly", "Lifetime"].map((plan) => (
            <button
              key={plan}
              className={selectedPlan === plan ? "active" : ""}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan}
            </button>
          ))}
        </div>

        <p><span className="discount-text">Save 33%</span> on a yearly subscription</p>
      </div>

      <div className="user-pricing-list-card">
        {dataSub.length > 0 ? (
          dataSub.map((sub, index) => (
            <PricingCard
              key={sub.id}
              title={sub.name_sub}
              price={`${parseFloat(sub.price).toLocaleString("vi-VN", { maximumFractionDigits: 0 })}đ`}
              period={sub.type == 1 ? "tháng" : sub.type == 2 ? "năm" : "vĩnh viễn"}
              features={{
                description: sub.description || "Không có mô tả",
                items: sub.ContentSubscriptions?.map((item) => ({
                  text: item.content,
                  included: item.included,
                })) || [],
              }}
              buttonText={(user === null && sub.name_sub === "Free") ? "Sign up" : sub.id === user?.userSub?.sub_id ? "Current" : (user !== null && sub.name_sub === "Free") ? "Current" :"Get Access"}
              isPopular={sub.is_popular}
            />
          ))
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
      <div className="user-pricing-card-list-tools">
        <img src={pricingToolImg} alt="" />
      </div>
      <div className="user-pricing-faq">
        <FAQSection />
      </div>
    </div>
  );
};

export default Pricing;
