import { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQSection.css";

const faqData = [
  {
    question: "Thư viện Al Prompt là gì và nó giúp bạn như thế nào?",
    answer:
      "Bạn từng tốn hàng giờ vật lộn với AI mà kết quả không như ý? Viết prompt hoài mà vẫn chưa tối ưu? Thư viện AI Prompt chính là giải pháp! Được xây dựng bởi các chuyên gia và thử nghiệm thực tế, thư viện này giúp bạn tiết kiệm thời gian, cải thiện độ chính xác và khai thác tối đa sức mạnh AI cho viết lách, marketing, SEO, tối ưu công việc và hơn thế nữa. Không cần thử-sai mệt mỏi, chỉ cần chọn prompt phù hợp và nhận kết quả chất lượng ngay lập tức!",
  },
  {
    question:
      "Thư viện AI Prompt có thể giúp doanh nghiệp phát triển như thế nào?",
    answer:
      "Với hàng nghìn Prompts trong mọi lĩnh vực mà mọi mô hình kinh doanh đều áp dụng như: Sales, Marketing, SEO, Business, Viết Lách, ... Thư viện AI Prompt sẽ chắc chắn giúp bạn giảm thời gian, tăng hiệu suất và kết quả của công việc 100%!",
  },
  {
    question:
      "Những danh mục nào trong Thư viện AI Prompt có giá trị nhất đối với các doanh nghiệp nhỏ?",
    answer:
      "Các danh mục có tác động lớn nhất bao gồm Kinh doanh (Business) Marketing, SEO, Viết lách, Khởi nghiệp Solo và Năng suất làm việc (Productivity).",
  },
  {
    question:
      "Làm thế nào để tận dụng tối đa giá trị của Thư viện AI Prompt?",
    answer:
      "Chỉ có một câu trả lời đúng: Hãy áp dụng hết để tiếp nhận thật nhiều thông tin, đưa ra quyết định logic nhất!",
  },
  {
    question: "Điều gì tạo nên AI Prompt tốt cho mục đích kinh doanh?",
    answer:
      "Prompts AI hiệu quả trong kinh doanh cần rõ ràng, cụ thể, linh hoạt, hướng đến kết quả và dễ dàng tùy chỉnh.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-left">
        <h2 className="faq-title">Q/A</h2>
        <p className="faq-description">
          Những hướng dẫn giúp bạn làm chủ cách viết Prompt. Vẫn còn thắc mắc?
          Hãy khám phá các hướng dẫn của chúng tôi hoặc thử tạo một Prompt ngay
          bây giờ!
        </p>
        <div className="faq-buttons">
          <Link to="/contact">
            <button className="faq-btn primary">Hỏi Thêm Tại Đây</button>
          </Link>
          <Link to="/contact">
            <button className="faq-btn secondary">Liên Hệ</button>
          </Link>
        </div>
      </div>

      <div className="faq-right">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <p style={{ width: "80%" }}> {item.question}</p>
              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="faq-more-action">
        <div className="faq-more-action-container">
          <h3 className="faq-more-action-title">Bạn có những thắc mắc?</h3>
          <div className="faq-contact-list">
            {/* <div className="faq-contact-item">
              <span className="faq-contact-item-title">Zalo</span>
              <br />
              <span className="faq-contact-item-content">0909.107.018</span>
            </div> */}
            <div className="faq-contact-item">
              <span className="faq-contact-item-title">Email</span>
              <br />
              <span className="faq-contact-item-content">contact@prom.io</span>
            </div>
            <div className="faq-contact-item">
              <span className="faq-contact-item-title">Discord</span>
              <br />
              <span className="faq-contact-item-content">@support_prom.io</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
