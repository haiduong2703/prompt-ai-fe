import React from "react";
import "./index.css";
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
const Home = () => {
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
      imgSrc: "your-image-url-1.jpg",
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
      imgSrc: "your-image-url-2.jpg",
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
      imgSrc: "your-image-url-3.jpg",
      borderColor: "#0047AB",
    },
  ];
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/images/prom-logo.svg" alt="Prom Logo" />
          <span>Prom</span>
        </div>
        <nav className="nav">
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Prompt</a>
          <a href="#">Tools</a>
          <a href="#">Products</a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Signup</button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-wrap">
            <div className="hero-image">
              <img src={img} alt="Astronaut" className="astronaut" />
              {/* <div className="try-prompt-btn">
                <span>Try Prompt</span>
                <span className="arrow">→</span>
              </div> */}
            </div>
            <div className="hero-content">
              <div className="hero-text">
                <h1>
                  <span className="purple-text">PROMPT IT.</span>
                  <br />
                  <span className="purple-text">OWN IT</span>
                </h1>
                <p>
                  Explore 170,000+ curated AI prompts made by expert AI creators
                </p>
                <button className="get-started-btn">
                  Get Started <span>→</span>
                </button>
              </div>
            </div>
          </div>
          <div className="partners-bar">
            <div className="users-count">
              <span className="count">125k+</span>
              <span className="label">Happy Users</span>
              <span className="badge">Beta</span>
            </div>
            <div className="partners-logos">
              <div className="partner">AI Prompt Marketplace</div>
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
                <img src={imgDall} alt="DALL-E" />
              </div>
              <div className="partner">and more...</div>
            </div>
          </div>
        </section>

        <section className="collection-section">
          <div className="collection-header">
            <div className="collection-title">
              <h2>
                The Biggest Collection
                <br />
                of AI Resources
              </h2>
            </div>
            <div className="collection-cta">
              <p>
                Find Super Prompt, enhance your business or start to sell your
                Prompt, 170K Prompt ready to download
              </p>
              <button className="view-more-btn">
                View more <span>→</span>
              </button>
            </div>
          </div>

          <div className="marketplace-cards">
            <div className="marketplace-card">
              <div className="card-content">
                <h3>Explore the Marketplace</h3>
                <p>Discover 100K+ prompt collections</p>
              </div>
              <img src={imgMarket} alt="Robot" className="card-img" />
              <div className="card-bg orange"></div>
            </div>
            <div className="marketplace-card">
              <div className="card-content">
                <h3>AI prompt</h3>
                <p>Unlock more value with AI prompts</p>
              </div>
              <img src={imgAI} alt="Robot" className="card-img" />
              <div className="card-bg orange"></div>
            </div>

            <div className="marketplace-card">
              <div className="card-content">
                <h3>Midjourney Prompts</h3>
                <p>Enhance image generation with prompts</p>
              </div>
              <img src={imgMidProm} alt="AI Face" className="card-img" />
              <div className="card-bg blue"></div>
            </div>

            <div className="marketplace-card">
              <div className="card-content">
                <h3>Chat GPT prompt</h3>
                <p>Explore 100K+ conversational prompts</p>
              </div>
              <img src={imgGPTProm} alt="AI Head" className="card-img" />
              <div className="card-bg teal"></div>
            </div>
            <div className="marketplace-card">
              <div className="card-content">
                <h3>Google Bard</h3>
                <p>Enhance AI interactions</p>
              </div>
              <img src={imgGenProm} alt="AI Head" className="card-img" />
              <div className="card-bg teal"></div>
            </div>
          </div>
        </section>

        <section className="best-prompts-section">
          <h2>Best Prompts for you</h2>
          <p>
            Discover the best AI prompts for ChatGPT & Midjourney designed to
            supercharge your business and boost your productivity.
          </p>

          <div className="tabs">
            <button className="tab active">
              <img src="/images/chatgpt-icon.png" alt="ChatGPT Icon" />
              <span>ChatGPT</span>
            </button>
            <button className="tab">
              <img src="/images/midjourney-icon.png" alt="Midjourney Icon" />
              <span>Midjourney</span>
            </button>
          </div>

          <div className="prompt-cards">
            <div className="prompt-card">
              <div className="card-label">Sales</div>
              <h3>Create Sales Funnels</h3>
              <div className="card-image">
                <img src="/images/sales-img.png" alt="Sales Funnel" />
              </div>
              <button className="solution-btn">Solution for Sales</button>
            </div>

            <div className="prompt-card">
              <div className="card-label">Business</div>
              <h3>Create Commission-Only Employment Contracts</h3>
              <div className="card-image">
                <img src="/images/business-img.png" alt="Business Contracts" />
              </div>
              <button className="solution-btn">Solution for Business</button>
            </div>

            <div className="prompt-card">
              <div className="card-label">Marketing</div>
              <h3>Find New-Industry ICP Marketing Strategies</h3>
              <p>
                Unlock innovative marketing strategies with this ChatGPT
                mega-prompt, providing actionable insights for engaging ideal
                customer profiles in Market Research.
              </p>
              <div className="card-image">
                <img
                  src="/images/marketing-img.png"
                  alt="Marketing Strategies"
                />
              </div>
              <button className="solution-btn">Solution for Marketing</button>
            </div>
          </div>
        </section>
        <div className="best-prompts">
          <div className="prompts-left">
            <h2>Create a Prompt marketplace for your community</h2>
            <p>
              Discover the best AI prompts for ChatGPT & Midjourney designed to
              supercharge your business and boost your productivity.
            </p>
            <button className="view-more">View more →</button>
          </div>
          <div className="prompts-grid">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="prompt-card"
                style={{ borderColor: prompt.borderColor }}
              >
                <img src={prompt.imgSrc} alt={prompt.title} />
                <div className="prompt-content">
                  <span className="prompt-subtitle">{prompt.subtitle}</span>
                  <h3>{prompt.title}</h3>
                  <ul>
                    {prompt.description.map((item, index) => (
                      <li key={index}>✅ {item}</li>
                    ))}
                  </ul>
                  <button className="prompt-btn">View more →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="floating-tools">
        <button className="tool-btn">
          <i className="icon-arrow"></i>
        </button>
        <button className="tool-btn active">
          <i className="icon-hand"></i>
        </button>
        <button className="tool-btn">
          <i className="icon-chat"></i>
        </button>
        <button className="ask-edit-btn">Ask to edit</button>
        <button className="tool-btn">
          <i className="icon-code"></i>
        </button>
      </div>

      <div className="purple-blob top-right"></div>
      <div className="purple-blob bottom-left"></div>
    </div>
  );
};

export default Home;
