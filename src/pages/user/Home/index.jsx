import React, { useState, useEffect } from "react";
import "./index.css";
import { Collapse } from "antd"; // Import Collapse từ Ant Design
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import img from "../../../asset/imgae/2.png";
import imgGPT from "../../../asset/imgae/gpt.png";
import imgMid from "../../../asset/imgae/mid.png";
import imgGen from "../../../asset/imgae/gen.png";
import imgDall from "../../../asset/imgae/dall.png";
import imgMarket from "../../../asset/imgae/market.jpg";
import imgAI from "../../../asset/imgae/aiprom.jpg";
import imgMidProm from "../../../asset/imgae/midprom.png";
import imgGPTProm from "../../../asset/imgae/gptprom.png";
import imgGenProm from "../../../asset/imgae/genprom.png";
import imgSale from "../../../asset/imgae/saleprom.png";
import imgBuss from "../../../asset/imgae/bussinessprom.png";
import imgMarketing from "../../../asset/imgae/marketing.png";
import imgFeed from "../../../asset/imgae/3.png";
import imgAvt1 from "../../../asset/imgae/avt1.png";
import imgAvt2 from "../../../asset/imgae/avt2.png";
import imgAvt3 from "../../../asset/imgae/avt3.png";
import imgSuperman from "../../../asset/imgae/imgsuper.png";
import imgDeep from "../../../asset/imgae/imgdeep.png";
import imgGrok from "../../../asset/imgae/imggrok.png";
import imgBack1 from "../../../asset/imgae/imgback1.png";
import imgBack2 from "../../../asset/imgae/imgback2.jpg";
import imgKhoi1 from "../../../asset/imgae/imgkhoi1.png";
import imgKhoi2 from "../../../asset/imgae/imgkhoi2.png";
import imgKhoi3 from "../../../asset/imgae/imgkhoi3.png";
import imgDecor1 from "../../../asset/imgae/imgdecor1.png";
import imgDecor2 from "../../../asset/imgae/imgdecor2.png";
import FAQSection from "../../../components/Q&A/FAQSection";
import PromptCard from "../../../components/user/Prompt/ListPrompts/PromptCard/PromptCard";
import logoClaude from "../../../asset/imgae/logoclaude.png";
import api from "../../../services/api";
import imgArrowUp from "../../../asset/imgae/arrow-up.png";
import imgBack3 from "../../../asset/imgae/imgback3.png";
// Dữ liệu prompts
const prompts = [
  {
    id: 1,
    title: "Free AI Agents System Prompt Generator",
    subtitle: "ChatGPT",
    description: [
      "Generate Unlimited System AI Agents Prompts",
      "How-to Guide & Tips",
      "Get Expert Level AI Prompts On Autopilot!",
    ],
    imgSrc: imgGPTProm,
    borderColor: "#4D6EF6",
  },
  {
    id: 2,
    title: "Free ChatGPT Prompts for Sales",
    subtitle: "Midjourney",
    description: [
      "Generate Unlimited System AI Agents Prompts",
      "How-to Guide & Tips",
      "Get Expert Level AI Prompts On Autopilot!",
    ],
    imgSrc: imgMidProm,
    borderColor: "#FF80A0",
  },
  {
    id: 3,
    title: "Free ChatGPT Prompts for Business",
    subtitle: "ChatGPT",
    description: [
      "Generate Unlimited System AI Agents Prompts",
      "How-to Guide & Tips",
      "Get Expert Level AI Prompts On Autopilot!",
    ],
    imgSrc: imgGenProm,
    borderColor: "#0047AB",
  },
];

// Dữ liệu marketplace cards
const marketplaceCards = [
  {
    title: "Khám Phá Thư Viện Prompts",
    description: "Với hơn 25.000 Prompts",
    imgSrc: imgMarket,
    bgColor: "orange",
  },
  {
    title: "AI Prompt",
    description: "Tối ưu hiệu suất với AI Prompts vượt trội",
    imgSrc: imgAI,
    bgColor: "orange",
  },
  {
    title: "Midjourney Prompts",
    description: "Biến ý tưởng tànnh hình ảnh sống động với prompt",
    imgSrc: imgMidProm,
    bgColor: "blue",
  },
  {
    title: "Tài Liệu AI",
    description: "Hướng dẫn AI mới nhất - Cập nhập mỗi tuần",
    imgSrc: imgGPTProm,
    bgColor: "teal",
  },
  {
    title: "Prompt Tùy Chỉnh",
    description: "Tạo Prompt cá nhân hóa theo mục đích của bạn",
    imgSrc: imgGenProm,
    bgColor: "teal",
  },
];

// Dữ liệu best prompts section
const bestPrompts = [
  {
    label: "Sales",
    title: "Create Sales Funnels",
    imgSrc: imgSale, // Placeholder vì chưa có ảnh import
    buttonText: "Solution for Sales",
  },
  {
    label: "Business",
    title: "Create Commission-Only Employment Contracts",
    imgSrc: imgBuss, // Placeholder
    buttonText: "Solution for Business",
  },
  {
    label: "Marketing",
    title: "Find New-Industry ICP Marketing Strategies",
    description:
      "Unlock innovative marketing strategies with this ChatGPT mega-prompt, providing actionable insights for engaging ideal customer profiles in Market Research.",
    imgSrc: imgMarketing, // Placeholder
    buttonText: "Solution for Marketing",
  },
];

// Dữ liệu cho Prompt Blog
const blogPosts = [
  {
    title:
      "Dưới đây là 100 Prom Midjourney hay nhất của chúng tôi trong tháng 1 năm 2025",
    description:
      "Hãy thử và trải nghiệm những Prom mới nhất, trending nhất mà...",
    readTime: "5 phút trước",
  },
  {
    title:
      "Những xu hướng mới nhất và chiến lược với một nhóm Prom mà bạn cần biết",
    description:
      "Hãy thử và trải nghiệm những Prom mới nhất, trending nhất mà...",
    readTime: "5 phút trước",
  },
  {
    title:
      "Điều gì khiến bạn loay hoay khi sử dụng Prom? Hãy thử điều chỉnh lại",
    description:
      "Hãy thử và trải nghiệm những Prom mới nhất, trending nhất mà...",
    readTime: "5 phút trước",
  },
];

// Dữ liệu cho FAQs
const faqs = [
  {
    key: "1", // Thêm key cho Collapse
    question: "What is an AI Prompt Library and why do I need one?",
    answer:
      "An AI Prompt Library is a curated collection of pre-written prompts designed to help businesses get optimal results from AI tools like ChatGPT and Midjourney. Think of it as a playbook for AI success - instead of spending hours figuring out how to phrase requests, you get instant access to proven prompts that deliver results.",
  },
  {
    key: "2",
    question: "How can the AI Prompt Library help my business grow?",
    answer:
      "The AI Prompt Library provides ready-to-use prompts that enhance productivity, improve marketing strategies, and streamline operations, helping your business save time and increase efficiency.",
  },
  {
    key: "3",
    question:
      "Which categories in the AI Prompt Library are most valuable for small businesses?",
    answer:
      "Categories like Sales, Marketing, and Business prompts are particularly valuable for small businesses, as they offer actionable insights and tools to boost engagement and revenue with minimal effort.",
  },
  {
    key: "4",
    question: "How do I get the most value from an AI Prompt Library?",
    answer:
      "To maximize value, regularly explore new prompts, tailor them to your specific needs, and integrate them into your workflows for consistent AI-driven results.",
  },
  {
    key: "5",
    question: "What makes a good AI prompt for business use?",
    answer:
      "A good AI prompt for business use is clear, specific, and tailored to achieve measurable outcomes, such as increasing sales, generating content, or optimizing processes.",
  },
];

// Dữ liệu testimonials
const testimonials = [
  {
    rating: 5,
    text: "Thư viện quá rộng lớn, chứa đầy những Prompts hữu ích, tôi đã đưa cho nhân viên dưới tôi những Prompts tương ứng với bộ phận của họ, hiệu suất tăng vọt trong thời gian rất ngắn!",
    author: {
      name: "Jason Trịnh",
      title: "CEO",
      avatar: imgAvt1,
    },
  },
  {
    rating: 5,
    text: "Midjourney Prompts giúp tôi rất nhiều trong việc design web và tạo các element đẹp mắt! Đồng thời những prompt về Sales và Marketing hỗ trợ tôi bán hàng dễ hơn bao giờ hết!",
    author: {
      name: "Phương Hoàng",
      title: "Web Designer",
      avatar: imgAvt3,
    },
  },
  {
    rating: 5,
    text: "Trước đây tôi phải mất hàng giờ để soạn email chào hàng, giờ chỉ cần chọn prompt phù hợp là có ngay nội dung chuyên nghiệp, tối ưu tỉ lệ chuyển đổi!",
    author: {
      name: "Minh Tú",
      title: "Sales Executive",
      avatar: imgAvt3,
    },
  },
  {
    rating: 5,
    text: "Prompt AI giúp tôi nhanh chóng tạo kịch bản gọi điện cho khách hàng tiềm năng. Không còn lo bị bí ý tưởng hay lúng túng khi chốt deal!",
    author: {
      name: "Hải Nam",
      title: "Account Manager",
      avatar: imgAvt2,
    },
  },
  {
    rating: 5,
    text: "Là giáo viên, tôi luôn muốn bài giảng hấp dẫn hơn. Các prompt trong thư viện giúp tôi tạo câu hỏi tương tác và nội dung giảng dạy cực kỳ hiệu quả!",
    author: {
      name: "Linh Đan",
      title: "Giảng viên Đại học",
      avatar: imgAvt3,
    },
  },

  {
    rating: 5,
    text: "Tôi dùng prompt để tạo bài quiz và flashcard cho học sinh. Giờ đây, việc ôn tập trở nên thú vị hơn rất nhiều!",
    author: {
      name: "Trọng Nhân",
      title: "Gia sư tiếng Anh",
      avatar: imgAvt1,
    },
  },

  {
    rating: 5,
    text: "Trước đây, tôi mất hàng giờ để viết caption hấp dẫn cho social media. Giờ chỉ cần chọn prompt phù hợp, tôi có ngay nội dung thu hút trong vài phút!",
    author: {
      name: "Lan Chi",
      title: "Social Media Manager",
      avatar: imgAvt3,
    },
  },
  {
    rating: 5,
    text: "Tạo nội dung email marketing chất lượng chưa bao giờ dễ dàng như thế! Tỉ lệ mở mail của tôi tăng hơn 35% nhờ prompt này.",
    author: {
      name: "Thành Nam",
      title: "Email Marketer",
      avatar: imgAvt1,
    },
  },
];

// Component Home
const Home = () => {
  const faqItems = faqs.map((faq) => ({
    key: faq.key,
    label: faq.question,
    children: <p>{faq.answer}</p>,
  }));
  const navigate = useNavigate();
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    const scrollAmount = direction === "next" ? 600 : -600;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const totalSlides = Math.ceil(testimonials.length / slidesPerView);
  const [newestPrompts, setNewestPrompts] = useState([]);
  const getListNewestPrompts = async () => {
    try {
      const query = new URLSearchParams({
        page: 1,
        pageSize: 8,
      }).toString();

      const response = await api.getPrompts(query);
      console.log("hiii", response.data.data);
      setNewestPrompts(response.data.data);
    } catch (error) {
      console.error("Error fetching newest prompts:", error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      getListNewestPrompts();
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="app">
      <main>
        {/* hero */}
        <div className="hero-container">
          <section className="hero-section">
            <img
              src={imgDecor2}
              alt="Decorative Shape 1"
              className="decoration-left"
            />
            <img
              src={imgDecor1}
              alt="Decorative Shape 2"
              className="decoration-bottom-right"
            />
            <div className="hero-wrap">
              <div className="hero-image">
                <img src={img} alt="Astronaut" className="astronaut" />
              </div>
              <div className="hero-content">
                <div className="hero-text">
                  <h1>
                    <span className="purple-text">KHÁM PHÁ NGAY</span>
                    <br />
                    <span className="purple-text">THƯ VIỆN PROMPT</span>
                    <br />
                    <span className="purple-text">LỚN NHẤT VIỆT NAM</span>
                  </h1>
                  <p>Hơn 25.000+ Prompt tạo ra từ các chuyên gia về AI</p>
                  <button
                    className="get-started-btn"
                    onClick={() => navigate("/prompts")}
                  >
                    Bắt đầu ngay{" "}
                    <img
                      style={{ marginLeft: "10px" }}
                      src={imgArrowUp}
                      alt="Arrow Up"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="partners-bar">
              <div className="users-count">
                <div className="users-count-item">
                  <div className="count-container">
                    <p className="count">10</p>
                    <p className="count-unit">K+</p>
                  </div>
                  <p className="label">khách hàng hài lòng</p>
                </div>
                <div className="badge">Trở thành 1 trong số họ</div>
              </div>
              <div className="partners-logos">
                <div className="partner">
                  <img src={imgGPT} alt="ChatGPT" />
                </div>
                <div className="partner">
                  <img src={imgMid} alt="Midjourney" />
                </div>
                <div className="partner">
                  <img src={imgGen} alt="Gemini" />
                </div>
                <div className="partner">
                  <img src={imgDeep} alt="DeepSeek" />
                </div>
                <div className="partner">
                  <img src={imgGrok} alt="Grok" />
                </div>
                <div className="partner">
                  <img src={logoClaude} alt="Claude" />
                </div>
                <div className="partner">
                  <img src={imgDall} alt="DALL-E" />
                </div>
                <div className="partner">và nhiều hơn nữa!</div>
              </div>
            </div>
          </section>
        </div>
        {/* The Biggest Collection */}
        <section className="collection-section">
          <div className="collection-header">
            <div className="collection-title">
              <h2>
                Thư Viện AI Lớn Nhất!
                <br />
                Mọi Thứ Về AI!
              </h2>
            </div>
            <div className="collection-cta">
              <p>
                Thúc đẩy doanh số, làm chủ doanh nghiệp, bứt phá qua vạch đích
                với hàng nghìn prompts được viết bởi chuyên gia
              </p>
              <button className="view-more-btn">
                Xem thêm<span>→</span>
              </button>
            </div>
          </div>

          <div className="marketplace-container">
            <button
              className="scroll-nav-button prev"
              onClick={() => scrollContainer("marketplace-cards", "prev")}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <div className="marketplace-cards" id="marketplace-cards">
              {marketplaceCards.map((card, index) => (
                <div key={index} className="marketplace-card">
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <img
                    src={card.imgSrc}
                    alt={card.title}
                    className="card-img"
                  />
                  <div className={`card-bg ${card.bgColor}`}></div>
                </div>
              ))}
            </div>
            <button
              className="scroll-nav-button next"
              onClick={() => scrollContainer("marketplace-cards", "next")}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </section>
        {/* best prompts for you */}
        <section className="solutions-section">
          <div className="solutions-container">
            <h2 className="section-title">Giải pháp toàn diện cho bạn</h2>
            <p className="section-description">
              Khám phá những Prom tốt nhất cho ChatGPT & Midjourney được thiết
              kế để thúc đẩy doanh nghiệp & dự án cá nhân của bạn tăng năng
              suất.
            </p>

            <div className="solutions-tags">
              <span className="tag">Khởi Nghiệp</span>
              <span className="tag">Tiktokers</span>
              <span className="tag">Chủ Doanh Nghiệp</span>
              <span className="tag">Làm Tự Do</span>
              <span className="tag">PR & Communications</span>
              <span className="tag">Sales</span>
            </div>

            <div className="solutions-content">
              <div className="cards-left">
                <div className="solution-card midjourney">
                  <span className="card-label">ChatGPT</span>
                  <h3>
                    Xác định những vấn đề khách hàng gặp phải để giải quyết
                  </h3>
                  <p>
                    Phân tích phản hồi của khách hàng và cải thiện sản phẩm của
                    bạn bằng Prompt ChatGPT này, tập trung vào các điểm khó
                    khăn, tác động kinh doanh và giải pháp.
                  </p>
                </div>
              </div>

              <div className="solution-image">
                <img src={imgBack2} alt="Solutions" className="main-image" />
              </div>

              <div className="cards-right">
                <div className="solution-card chatgpt">
                  <span className="card-label">Chat GPT</span>
                  <h3>Nghiên cứu quy mô thị trường và tiềm năng tăng trưởng</h3>
                  <p>
                    Phân tích xu hướng và cơ hội thị trường bằng Prompt ChatGPT,
                    cung cấp thông tin chi tiết và dự báo chiến lược.
                  </p>
                </div>
              </div>
            </div>

            <img src={imgBack1} alt="" className="decoration back1" />
            <img src={imgKhoi1} alt="" className="decoration khoi1" />
            <img src={imgKhoi2} alt="" className="decoration khoi2" />
            <img src={imgKhoi3} alt="" className="decoration khoi3" />
          </div>
        </section>
        {/* Create a prompts */}
        {/*List prompts */}
        {/* <div className="newest-prompts-container">
          <div className="newest-prompt-list">
            {newestPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                // image_category={category?.image_card}
                // activeSection={activeSection}
              />
            ))}
          </div>
        </div> */}
        <div className="prompt-list-container">
          <h1>Xu hướng Prompts nổi bật</h1>
          <div className="prompt-list-home">
            {newestPrompts.length === 0 ? (
              <p>No prompts found</p>
            ) : (
              newestPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  // image_category={category?.image_card}
                  activeSection={prompt?.Category?.Section}
                />
              ))
            )}
          </div>
          <button className="button-prompts">
            Tìm hiểu thêm! <span>→</span>
          </button>
        </div>
        {/* Thêm section Prompt Blog */}
        <section className="prompt-blog">
          <div className="blog-header-container">
            <h2>Prom Blogs</h2>
            <div className="blog-header-container-content">
              <p>
                {" "}
                Các bài viết cập nhật các tin tức mới nhất liên quan đến Prompts
                và AI.
              </p>
            </div>
          </div>
          <div className="blog-container">
            {/* <button
              className="scroll-nav-button prev"
              onClick={() => scrollContainer("blog-posts", "prev")}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button> */}
            <div className="blog-posts" id="blog-posts">
              {blogPosts.map((post, index) => (
                <div key={index} className="blog-post">
                  <div className="blog-dot"></div>
                  <div className="blog-content">
                    <span className="blog-read-time">{post.readTime}</span>
                    <h3>{post.title}</h3>
                    <div className="blog-footer">
                      <p>{post.description}</p>
                      <button className="blog-button">
                        <ArrowRightOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <button
              className="scroll-nav-button next"
              onClick={() => scrollContainer("blog-posts", "next")}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button> */}
          </div>
        </section>

        {/* Thêm section FAQs với Collapse từ Ant Design */}
        <div
          className="home-faq"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <FAQSection />
        </div>
        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div>
            {" "}
            <img src={imgFeed} alt="Astronaut" className="astronaut-image" />
          </div>
          <div className="testimonials-content">
            <div className="testimonials-header">
              <div className="testimonials-label">PHẢN HỒI CỦA NGƯỜI DÙNG</div>
              <h2 className="testimonials-title">Họ nói gì về PROM?</h2>
            </div>

            <div className="testimonials-wrapper">
              <button
                className="scroll-nav-button prev"
                onClick={() =>
                  scrollContainer("testimonials-container", "prev")
                }
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <div
                className="testimonials-container"
                id="testimonials-container"
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < testimonial.rating
                              ? "star-filled"
                              : "star-empty"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="testimonial-text">"{testimonial.text}"</div>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <img
                          src={testimonial.author.avatar}
                          alt={testimonial.author.name}
                        />
                      </div>
                      <div className="author-info-home">
                        <div className="author-name">
                          {testimonial.author.name}
                        </div>
                        <div className="author-title">
                          {testimonial.author.title}
                        </div>
                      </div>
                    </div>
                    <div className="quote-icon">"</div>
                  </div>
                ))}
              </div>
              <button
                className="scroll-nav-button next"
                onClick={() =>
                  scrollContainer("testimonials-container", "next")
                }
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Hire AI Creator Section */}
        <section className="hire-creator-section">
          <div className="hire-creator-card">
            <div className="hire-creator-content">
              <h2 className="hire-creator-title">
                Hãy tạo những dự án tuyệt vời và chính xác từ Prom
              </h2>
              <p className="hire-creator-description">
                Tạo nội dung cho chính bạn một cách nhanh chóng và chuẩn xác
                nhất
              </p>
              <button className="hire-creator-button">Bắt đầu ngay!!!🔥</button>
            </div>
            <div className="solution-background"></div>
            <img
              src={imgBack3}
              alt="AI Creator"
              className="hire-creator-image"
            />

            <div className="hire-creator-decoration decoration-1"></div>
            <div className="hire-creator-decoration decoration-2"></div>
          </div>
        </section>

        {/* Giải pháp toàn diện section */}
      </main>
    </div>
  );
};

export default Home;
