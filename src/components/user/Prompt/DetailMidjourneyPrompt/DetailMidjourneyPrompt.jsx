import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../../../services/api";
import {
  StarFilled,
  RightOutlined,
  LockFilled,
  CaretRightFilled,
} from "@ant-design/icons";
import "./DetailMidjourneyPrompt.css";
import whatIcon from "../../../../asset/imgae/icon_what.svg";
import tipIcon from "../../../../asset/imgae/icon_tips.svg";
import howIcon from "../../../../asset/imgae/icon_what.svg";
import inputIcon from "../../../../asset/imgae/input_icon.svg";
import outputIcon from "../../../../asset/imgae/output_icon.svg";
import PromptCard from "../ListPrompts/PromptCard/PromptCard";
import copyIcon from "../../../../asset/icon/copy_icon.svg";
import { UserContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
const DetailMidjourneyPrompt = () => {
  const location = useLocation();
  const { id } = useParams();
  const [prompt, setPrompt] = useState([]);
  const [copyStatus, setCopyStatus] = useState(false);
  const optimationRef = useRef(null);
  const [relatedPrompts, setRelatedPrompts] = useState([]);
  const [exampleVariables, setExampleVariables] = useState([]);
  const [examplePrompts, setExamplePrompts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    howToUse: false,
    exampleInput: false,
    exampleOutput: false,
    additionalTips: false,
    additionalInfo: false,
  });
  const { user } = useContext(UserContext); // Lấy user từ Context API
  const [isNew, setIsNew] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const getFavoritePrompts = async () => {
    try {
      const resp = await api.getFavoritePrompts(user?.id);
      setFavoriteList(resp.data);
    } catch (error) {
      console.error("Error fetching favorite prompts:", error);
    }
  };
  useEffect(() => {
    if (user != null) {
      getFavoritePrompts();
    }
  }, []);
  useEffect(() => {
    setExpandedSections({
      howToUse: false,
      exampleInput: false,
      exampleOutput: false,
      additionalTips: false,
      additionalInfo: false,
    });
  }, [id]);
  const copyToClipboard = () => {
    if (optimationRef.current) {
      const text = optimationRef.current.innerText; // Lấy nội dung text, bỏ thẻ HTML
      navigator.clipboard.writeText(text).then(() => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000); // Reset trạng thái sau 2s
      });
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const showVariableDescription = (index) => {
    const descriptions = document.querySelectorAll(
      ".detail-prompt-section-content-exampleVariables-description"
    );
    descriptions.forEach((description, i) => {
      if (i === index) {
        description.style.display = "block";
      } else {
        description.style.display = "none";
      }
    });
  };
  useEffect(() => {
    if (id) {
      getDetailPrompt(id);
      window.scrollTo(0, 0);
    }
  }, [id]);
  const extractImageUrl = (htmlString) => {
    const match = htmlString.match(/src="([^"]+)"/); // Lấy giá trị trong src=""
    return match ? match[1] : ""; // Trả về URL hoặc chuỗi rỗng nếu không tìm thấy
  };
  const getDetailPrompt = async (id) => {
    try {
      const resp = await api.getPromptById(id);
      setPrompt(resp.data);
      const listDetail = resp.data?.PromDetails;
      const examplePromptsData = (
        listDetail?.filter((item) => item.type === 1) || []
      ).map((item) => ({
        ...item,
        image: extractImageUrl(item.image), // Thay thế image bằng URL trích xuất
      }));
      const exampleVariablesData =
        listDetail?.filter((item) => item.type === 2) || [];
      setExamplePrompts(examplePromptsData);
      setExampleVariables(exampleVariablesData);
      getListRelatedPrompts(
        resp?.data?.Category?.id,
        resp?.data?.topic?.id,
        resp?.data?.id
      );
      const createdDate = new Date(resp?.data?.created_at);
      const currentDate = new Date();
      const daysDiff = (currentDate - createdDate) / (1000 * 60 * 60 * 24);
      const temp = daysDiff <= 30;
      setIsNew(temp);
    } catch (error) {}
  };
  const getListRelatedPrompts = async (
    category_id,
    topic_id,
    current_prompt_id
  ) => {
    try {
      const resp = await api.getRelatedPrompts(
        current_prompt_id,
        category_id,
        topic_id
      );
      setRelatedPrompts(resp.data.data);
    } catch (error) {
      console.error("Error fetching newest prompts:", error);
    }
  };
  // Thêm state để theo dõi biến nào đang được mở
  const [expandedVariables, setExpandedVariables] = useState({});

  // Thay đổi hàm toggleVariable
  const toggleVariable = (index) => {
    setExpandedVariables((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div className="detail-prompt-component">
      <div className="detail-prompt-container">
        <div className="detail-prompt-content">
          <div className="detail-prompt-header">
            <div className="detail-prompt-header-section">
              <img src={prompt?.Category?.Section?.description} alt="ChatGPT" />
              <span>Midjourney Prompts</span>
            </div>
            <div className="detail-prompt-premium-tag">
              {isNew && (
                <div className="detail-prompt-premium-tag-new">New</div>
              )}
              {/* {prompt?.is_type === 2 ? (
                                <div className="detail-prompt-premium-tag-premium">
                                    <StarFilled /> Premium
                                </div>
                            ) : (
                                <div className="detail-prompt-premium-tag-free">
                                    Free
                                </div>
                            )} */}
            </div>
          </div>
          <div className="detail-prompt-title">
            <h1>{prompt?.title}</h1>
          </div>
          <div className="detail-prompt-content-note">
            <span style={{ fontSize: "204x" }}>💡 </span>
            <div dangerouslySetInnerHTML={{ __html: prompt.content }} />
          </div>
          {prompt?.what && (
            <div className="detail-prompt-paragraph">
              <div>
                <h2 className="prompt-sub-title-paragraph">
                  {" "}
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b173a7b5743b3e11e3a_tools.svg"
                    alt="icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                    }}
                  />
                  Prompt này làm gì
                </h2>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: prompt.what }}
                className="detail-prompt-paragraph-content"
              />
            </div>
          )}

          {prompt?.text && (
            <div className="detail-prompt-paragraph-special">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <h2 className="prompt-sub-title-paragraph-special">
                  <div dangerouslySetInnerHTML={{ __html: prompt.text }} />
                </h2>
              </div>
              <div
                className={`detail-prompt-paragraph-special-content-box ${
                  user?.userSub.subscription?.type > 1 || user?.count_prompt > 0
                    ? ""
                    : "blurred"
                }`}
              >
                {(user?.userSub.subscription?.type > 1 ||
                  user?.count_prompt > 0) && (
                  <button className="copy-button" onClick={copyToClipboard}>
                    {copyStatus ? (
                      <>
                        <img src={copyIcon} alt="icon" />
                        Copied
                      </>
                    ) : (
                      <>
                        <img src={copyIcon} alt="icon" />
                        Copy
                      </>
                    )}
                  </button>
                )}
                <div
                  className="detail-prompt-paragraph-special-content"
                  ref={optimationRef}
                  dangerouslySetInnerHTML={{ __html: prompt.OptimationGuide }}
                />
              </div>
              {user?.userSub?.subscription?.type === 1 &&
                user?.count_prompt === 0 && (
                  <Link
                    to="/pricing"
                    className="detail-prompt-paragraph-special-content-link"
                  >
                    <LockFilled />
                    Nâng cấp ngay!
                  </Link>
                )}
              {!user && (
                <Link
                  to="/login"
                  className="detail-prompt-paragraph-special-content-link"
                >
                  <LockFilled />
                  Đăng nhập để xem!
                </Link>
              )}
            </div>
          )}

          {exampleVariables && exampleVariables.length > 0 && (
            <div className="detail-prompt-section">
              <div className="detail-prompt-section-header">
                <div className="detail-prompt-section-title">
                  <span>🔄 Ví dụ các Biến:</span>
                </div>
              </div>
              <div className="detail-prompt-section-content-exampleVariables">
                {exampleVariables.map((variable, index) => (
                  <div key={index} className="detail-prompt-exampleVariables">
                    <div
                      className="detail-prompt-exampleVariables-header"
                      onClick={() => toggleVariable(index)}
                    >
                      <div className="detail-prompt-exampleVariables-title">
                        <span>
                          <CaretRightFilled
                            rotate={expandedVariables[index] ? 90 : 0}
                            style={{
                              marginRight: "8px",
                              transition: "transform 0.3s ease",
                            }}
                          />
                          {variable.text}
                        </span>
                      </div>
                    </div>
                    {expandedVariables[index] && (
                      <div
                        className="detail-prompt-section-content-exampleVariables-description"
                        style={{
                          animation: "fadeIn 0.3s ease-in-out",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: variable.description,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* {prompt?.tips && (
            <div className="detail-prompt-paragraph">
              <div>
                <h2 className="prompt-sub-title-paragraph">
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b1794800782b59bafcc_lightbulb.svg"
                    alt="icon"
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                    }}
                  />
                  Mẹo
                </h2>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: prompt.tips }}
                className="detail-prompt-paragraph-content"
              />
            </div>
          )} */}
          {examplePrompts && examplePrompts.length > 0 && (
            <div className="detail-prompt-section-example-prompt">
              <div className="detail-prompt-section-header-example-prompt">
                <div className="detail-prompt-section-title">
                  <span>✅ Ví dụ các Prompts:</span>
                </div>
              </div>
              <div className="detail-prompt-section-content-examplePrompts">
                {examplePrompts.map((promptMid, index) => (
                  <div className="component-prompt-card-container-examplePrompts">
                    <div
                      className="component-prompt-card-midjourney"
                      style={{ background: `url(${promptMid.image})` }}
                    >
                      <div className="component-prompt-card-header">
                        <div className="component-prompt-card-image-block">
                          <img
                            src={prompt?.Category?.Section?.description}
                            alt="Midjourney Logo"
                            className="component-prompt-icon"
                          />
                        </div>
                        <div className="component-premium-tag-div">
                          {/* {isNew && <span className="component-new-tag">New</span>} */}
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="component-prompt-card-topic"
                      style={{
                        position: "relative",
                        bottom: 0,
                        width: "100%",
                        marginTop: "auto",
                        whiteSpace: "normal",
                      }}
                    >
                      {promptMid?.text || "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {prompt.how && (
            <div
              className="detail-prompt-section"
              onClick={() => toggleSection("howToUse")}
            >
              <div className="detail-prompt-section-header">
                <div className="detail-prompt-section-title">
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b173a7b5743b3e11e37_questions.svg"
                    alt="How to use"
                  />
                  <span>Cách sử dụng Prompt</span>
                </div>
                <RightOutlined rotate={expandedSections.howToUse ? 90 : 0} />
              </div>
              {expandedSections.howToUse && (
                <div className="detail-prompt-section-content">
                  <div dangerouslySetInnerHTML={{ __html: prompt.how }} />
                </div>
              )}
            </div>
          )}

          {prompt.input && (
            <div
              className="detail-prompt-section"
              onClick={() => toggleSection("exampleInput")}
            >
              <div className="detail-prompt-section-header">
                <div className="detail-prompt-section-title">
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b17967b11f0ec779ce6_inbox-tray-svgrepo-com.svg"
                    alt="Example input"
                  />
                  <span>Ví dụ đầu vào</span>
                </div>
                <RightOutlined
                  rotate={expandedSections.exampleInput ? 90 : 0}
                />
              </div>
              {expandedSections.exampleInput && (
                <div className="detail-prompt-section-content">
                  <div dangerouslySetInnerHTML={{ __html: prompt.input }} />
                </div>
              )}
            </div>
          )}

          {prompt.output && (
            <div
              className="detail-prompt-section"
              onClick={() => toggleSection("exampleOutput")}
            >
              <div className="detail-prompt-section-header">
                <div className="detail-prompt-section-title">
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b1764188051455cd76d_outbox-tray-svgrepo-com.svg"
                    alt="Example output"
                  />
                  <span>Ví dụ đầu ra</span>
                </div>
                <RightOutlined
                  rotate={expandedSections.exampleOutput ? 90 : 0}
                />
              </div>
              {expandedSections.exampleOutput && (
                <div className="detail-prompt-section-content">
                  <div dangerouslySetInnerHTML={{ __html: prompt.output }} />
                </div>
              )}
            </div>
          )}

          {prompt.addtip && (
            <div
              className="detail-prompt-section"
              onClick={() => toggleSection("additionalTips")}
            >
              <div className="detail-prompt-section-header">
                <div className="detail-prompt-section-title">
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b1794800782b59bafcc_lightbulb.svg"
                    alt="Additional tips"
                  />
                  <span>Gợi ý</span>
                </div>
                <RightOutlined
                  rotate={expandedSections.additionalTips ? 90 : 0}
                />
              </div>
              {expandedSections.additionalTips && (
                <div className="detail-prompt-section-content">
                  <div dangerouslySetInnerHTML={{ __html: prompt.addtip }} />
                </div>
              )}
            </div>
          )}

          {prompt.addinformation && (
            <div
              className="detail-prompt-section"
              onClick={() => toggleSection("additionalInfo")}
            >
              <div className="detail-prompt-section-header">
                <div className="detail-prompt-section-title">
                  <img
                    src="https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/666e3b173a7b5743b3e11e3a_tools.svg"
                    alt="Additional information"
                  />
                  <span>Thông tin bổ sung</span>
                </div>
                <RightOutlined
                  rotate={expandedSections.additionalInfo ? 90 : 0}
                />
              </div>
              {expandedSections.additionalInfo && (
                <div className="detail-prompt-section-content">
                  <div
                    dangerouslySetInnerHTML={{ __html: prompt.addinformation }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Danh sách prompt mới nhất */}
        <div className="related-prompts-container">
          <div className="related-prompts-title-box">
            <h2>Prompts Liên Quan</h2>
          </div>
          <div className="related-prompt-list-wrapper">
            <div className="related-prompt-list">
              {relatedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  favoriteList={favoriteList}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMidjourneyPrompt;
