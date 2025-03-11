import { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQSection.css";

const faqData = [
  {
    question: "Thư viện Al Prompt là gì và tại sao bạn cần nó?",
    answer:
      "Thư viện nhắc nhở AI là một bộ sưu tập được tuyển chọn gồm các nhắc nhở được viết sẵn được thiết kế để giúp các doanh nghiệp có được kết quả tối ưu từ các công cụ AI như ChatGPT và Midjourney. Hãy coi đây là cẩm nang thành công của bạn về AI – thay vì dành hàng giờ để tìm cách diễn đạt yêu cầu, bạn có thể truy cập ngay vào các nhắc nhở đã được chứng minh mang lại kết quả.",
  },
  {
    question:
      "Thư viện AI Prompt có thể giúp doanh nghiệp phát triển như thế nào?",
    answer:
      "Thư viện nhắc nhở AI toàn diện của chúng tôi bao gồm các lĩnh vực quan trọng trong kinh doanh như marketing, SEO, content creation, and productivity.",
  },
  {
    question:
      "Những danh mục nào trong Thư viện nhắc nhở AI có giá trị nhất đối với các doanh nghiệp nhỏ?",
    answer:
      "Các danh mục có tác động lớn nhất bao gồm Kinh doanh, Marketing, SEO, Viết lách, Doanh nhân cá nhân và Năng suất làm việc.",
  },
  {
    question:
      "Làm thế nào để tận dụng tối đa giá trị của Thư viện nhắc nhở AI?",
    answer:
      "Bắt đầu với những nhu cầu kinh doanh cấp thiết của bạn, thử nghiệm các lời nhắc khác nhau, tùy chỉnh chúng theo ngành của bạn và kết hợp chúng để có kết quả toàn diện.",
  },
  {
    question: "Điều gì tạo nên lời nhắc AI tốt cho mục đích kinh doanh?",
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
        <h2 className="faq-title">Câu hỏi</h2>
        <p className="faq-description">
          Những hướng dẫn giúp bạn làm chủ cách viết Prompt. Vẫn còn thắc mắc?
          Hãy khám phá các hướng dẫn của chúng tôi hoặc thử tạo một Prompt ngay
          bây giờ!
        </p>
        <div className="faq-buttons">
          <Link to="/contact">
            <button className="faq-btn primary">More Questions</button>
          </Link>
          <Link to="/contact">
            <button className="faq-btn secondary">Contact Us</button>
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
            <div className="faq-contact-item">
              <span className="faq-contact-item-title">Zalo</span>
              <br />
              <span className="faq-contact-item-content">0909.107.018</span>
            </div>
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
