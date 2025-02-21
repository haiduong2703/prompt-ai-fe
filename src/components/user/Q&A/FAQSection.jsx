import { useState } from "react";
import "./FAQSection.css"
const faqData = [
  {
    question: "What is an AI Prompt Library and why do I need one?",
    answer:
      "An AI Prompt Library is a curated collection of pre-written prompts designed to help businesses get optimal results from AI tools like ChatGPT and Midjourney...",
  },
  {
    question: "How can the AI Prompt Library help my business grow?",
    answer:
      "By providing well-structured prompts, the AI Prompt Library ensures you get high-quality responses that drive business growth...",
  },
  {
    question: "Which categories in the AI Prompt Library are most valuable for small businesses?",
    answer:
      "The most valuable categories for small businesses include marketing, customer support, and content creation...",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
        >
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span className="faq-icon">{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && <p className="faq-answer">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
