import { useState } from "react";
import "./FAQSection.css"
const faqData = [
  {
    question: "What is an AI Prompt Library and why do I need one?",
    answer: [
      "An AI Prompt Library is a curated collection of pre-written prompts designed to help businesses get optimal results from AI tools like ChatGPT and Midjourney. Think of it as your playbook for AI success – instead of spending hours figuring out how to phrase requests, you get instant access to proven prompts that deliver results.",
    ],
  },
  {
    question: "How can the AI Prompt Library help my business grow?",
    answer: [
      "Our comprehensive AI Prompt Library covers crucial business areas including marketing, SEO, content creation, and productivity. Each prompt is specifically engineered to help you:",
      "Generate high-converting marketing copy",
      "Create engaging social media content",
      "Develop effective business strategies",
      "Streamline operations and workflows",
      "Automate business processes",
      "Automate digital marketing tasks",
      "Boost overall productivity"
    ],
  },
  {
    question: "Which categories in the AI Prompt Library are most valuable for small businesses?",
    answer: [
      "The most impactful categories include:",
      "1. Business (420 prompts) - For strategy, planning, and operations",
      "2. Marketing (354 prompts) - For campaigns and customer engagement",
      "3. SEO (320 prompts) - For improving online visibility",
      "4. Writing (411 prompts) - For content creation and communications",
      "5. Solopreneurs (370 prompts) - For solo business owners",
      "6. Productivity (386 prompts) - For efficiency and time management"
    ],
  },
  {
    question: "How do I get the most value from an AI Prompt Library?",
    answer: [
      "To maximize your AI Prompt Library usage:",
      "- Start with your immediate business needs",
      "- Test different prompts within each category",
      "- Customize prompts to your specific industry",
      "- Combine prompts for more comprehensive results",
      "- Regular practice leads to better outcomes",
    ],
  },
  {
    question: "What makes a good AI prompt for business use?",
    answer: [
      "Effective business prompts should be:",
      "- Clear and specific",
      "- Focused on business outcomes",
      "- Adaptable to different scenarios",
      "- Results-oriented",
      "- Easy to customize",
    ],
  },
  {
    question: "What pricing options are available for the AI Prompt Library?",
    answer: [
      "We offer both one-time purchase and monthly subscription options to suit different needs:",
      "1. One-Time Purchase:",
      "- ChatGPT Bundle: $97",
      "- Midjourney Bundle: $67",
      "- Complete AI Bundle: $150 (Best Value!)",
      "2. Monthly Subscription:",
      "- Individual Category Packs: $3.99/month",
      "- ChatGPT Bundle: $9.99/month",
      "- Complete AI Bundle: $15/month",
      "See https://prom.vn/pricing to learn more."
    ],
  },
  {
    question: "There's lots of free AI prompts online, why should I pay for them?",
    answer: [
      "Free doesn't mean good. We craft the prompts by hand with the latest quality prompt engineering practices to ensure you get the best possible output that is extremely personalized and tailored to your business needs.  ",
    ],
  },
  {
    question: "Is there a money-back guarantee?",
    answer: [
      "Yes, we offer a 7-day money back guarantee on all our plans.",

      "Try our AI Prompt Library risk-free and see the impact on your business productivity and growth."
    ],
  },
  {
    question: "Which plan is most popular among small businesses?",
    answer: [
      "Most small businesses start with either:",
      "1. ChatGPT Mega-Prompt Bundle ($97 or $9.99/mo) for comprehensive text-based AI solutions",
      "2. The Complete AI Bundle ($150 or $15/mo) for maximum value and full access"
    ],
  },
  {
    question: "Do prices include future updates?",
    answer: [
      "Yes! When you purchase any one-time plan, you get:",
      "- Access to all current prompts",
      "- Ongoing support and improvements"
    ],
  },
  {
    question: "I have more questions.",
    answer: [
      "We're here to support you! Our team is available to guide you through the process of using the prompts or answer any of your questions at info@prom.vn."
    ],
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
        <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span className="faq-icon">{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">
              {Array.isArray(item.answer) ? (
                <ul>
                  {item.answer.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.answer}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
