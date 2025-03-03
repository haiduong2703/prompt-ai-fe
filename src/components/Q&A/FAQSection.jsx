import { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQSection.css";

const faqData = [
  {
    question: "What is an AI Prompt Library and why do I need one?",
    answer:
      "An AI Prompt Library is a curated collection of pre-written prompts designed to help businesses get optimal results from AI tools like ChatGPT and Midjourney. Think of it as your playbook for AI success – instead of spending hours figuring out how to phrase requests, you get instant access to proven prompts that deliver results.",
  },
  {
    question: "How can the AI Prompt Library help my business grow?",
    answer:
      "Our comprehensive AI Prompt Library covers crucial business areas including marketing, SEO, content creation, and productivity.",
  },
  {
    question: "Which categories in the AI Prompt Library are most valuable for small businesses?",
    answer:
      "The most impactful categories include Business, Marketing, SEO, Writing, Solopreneurs, and Productivity.",
  },
  {
    question: "How do I get the most value from an AI Prompt Library?",
    answer:
      "Start with your immediate business needs, test different prompts, customize them to your industry, and combine them for comprehensive results.",
  },
  {
    question: "What makes a good AI prompt for business use?",
    answer:
      "Effective business prompts should be clear, specific, adaptable, results-oriented, and easy to customize.",
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
        <h2 className="faq-title">FAQs</h2>
        <p className="faq-description">
          Your Guide to Mastering Prompts. Still have questions? Explore our guides or try crafting a prompt now!
        </p>
        <div className="faq-buttons">
          <Link to="/contact"><button className="faq-btn primary">More Questions</button></Link>
          <Link to="/contact"><button className="faq-btn secondary">Contact Us</button></Link>
        </div>
      </div>

      <div className="faq-right">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
