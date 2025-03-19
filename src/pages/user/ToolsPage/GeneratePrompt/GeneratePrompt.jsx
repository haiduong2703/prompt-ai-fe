import React, { useState } from "react";
import "./GeneratePrompt.css";
import astronault_tool from "../../../../asset/imgae/toolPage/astronault_tool.png";
import sparkle_icon from "../../../../asset/imgae/toolPage/pen_tool.png";
import item1 from "../../../../asset/imgae/toolPage/item1.png";
import item2 from "../../../../asset/imgae/toolPage/item2.png";
import item3 from "../../../../asset/imgae/toolPage/item3.png";
import item4 from "../../../../asset/imgae/toolPage/item4.png";
import cursor_click from "../../../../asset/imgae/toolPage/cursor_click.png";
import imgFeed from "../../../../asset/imgae/3.png";
import imgAvt1 from "../../../../asset/imgae/avt1.png";
import imgAvt2 from "../../../../asset/imgae/avt2.png";
import imgAvt3 from "../../../../asset/imgae/avt3.png";
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

const GeneratePrompt = () => {
  const [goal, setGoal] = useState("");
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId);
    const scrollAmount = direction === "next-unique" ? 600 : -600;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const handleGeneratePrompt = () => {
    // Logic to generate prompt goes here
    console.log("Generating prompt for:", goal);
  };

  return (
    <>
      <div className="generate-prompt-page-unique">
        <div className="generate-prompt-container-unique">
          <div className="generate-prompt-header-unique">
            <div className="generate-header-icon-left-unique">
              <img src={sparkle_icon} alt="Sparkle icon" className="sparkle-icon-unique" />
            </div>

            <div className="generate-prompt-title-unique">
              <h1>Generate Your <br />AI Prompts In One Click <img src={cursor_click} alt="cursor_click" /></h1>
              <p className="generate-subtitle-unique">Get powerful AI prompts with ease — just describe your goal/prompt like you're chatting with a friend, and I'll handle the rest!</p>

              <div className="generate-free-label-unique">
                <span>UNLIMITED FREE PROMPTS ENABLED</span>
              </div>
            </div>

            <div className="astronaut-image-unique">
              <img src={astronault_tool} alt="Astronaut" />
            </div>
          </div>

          <div className="generate-prompt-input-section-unique">
            <label htmlFor="goal-input">What's your goal?</label>
            <textarea
              id="goal-input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              maxLength={1000}
              placeholder="Describe what you want to achieve..."
              className="goal-textarea-unique"
            ></textarea>
            <div className="character-count-unique">
              <span>Max: 1000 characters (150-200 words)</span>
            </div>

            <button className="generate-button-unique" onClick={handleGeneratePrompt}>
              Generate Prompt
            </button>

            <p className="max-note-unique">*Free for MAX plan members!</p>
          </div>
        </div>

        <div className="generate-prompt-features-unique">
          <div className="generate-prompt-feature-item-unique">
            <span><img src={item1} alt="Login/Sign up" /></span>
            <h3>Login / Sign up</h3>
            <p>I will send your prompt to the registered email</p>
          </div>

          <div className="generate-prompt-feature-item-unique">
            <span><img src={item2} alt="Describe Your Goal" /></span>
            <h3>Describe Your Goal</h3>
            <p>I will deliver the prompt based on it</p>
          </div>

          <div className="generate-prompt-feature-item-unique">
            <span><img src={item3} alt="Unlimited Prompts" /></span>
            <h3>Unlimited Prompts</h3>
            <p>Free for MAX Plan Members</p>
          </div>

          <div className="generate-prompt-feature-item-unique">
            <span><img src={item4} alt="Receive the Prompt" /></span >
            <h3>Receive the Prompt</h3>
            <p>Get your custom prompt & a PDF guide + CSV via email</p>
          </div>
        </div>

      </div>

      {/* Phản hồi của người dùng */}
      <section className="generate-testimonials-section-unique">
        <div className="generate-testimonials-content-unique">
          <div className="generate-testimonials-header-unique">
            {/* <div className="generate-testimonials-label">PHẢN HỒI CỦA NGƯỜI DÙNG</div> */}
            <h2 className="generate-testimonials-title-unique">Phản hồi tuyệt vời từ người dùng</h2>
          </div>

          <div className="generate-testimonials-wrapper-unique">
            <button
                className="scroll-nav-button-unique prev-unique"
                onClick={() =>
                  scrollContainer("generate-testimonials-container-unique", "prev-unique")
                }
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
            <div
              className="generate-testimonials-container-unique"
              id="generate-testimonials-container-unique"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="generate-testimonial-card-unique">
                  <div className="generate-testimonial-rating-unique">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < testimonial.rating
                            ? "generate-star-filled-unique"
                            : "generate-star-empty-unique"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="generate-testimonials-text-unique">"{testimonial.text}"</div>
                  <div className="generate-testimonials-author-unique">
                    <div className="generate-author-avatar-unique">
                      <img
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                      />
                    </div>
                    <div className="generate-author-info-home-unique">
                      <div className="generate-author-name-unique">
                        {testimonial.author.name}
                      </div>
                      <div className="generate-author-title-unique">
                        {testimonial.author.title}
                      </div>
                    </div>
                  </div>
                  <div className="generate-quote-icon-unique">"</div>
                </div>
              ))}
            </div>
            <button
              className="scroll-nav-button-unique next-unique"
              onClick={() =>
                scrollContainer("generate-testimonials-container-unique", "next-unique")
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
    </>

  );
};

export default GeneratePrompt;
