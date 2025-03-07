import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../../../services/api";
import { StarFilled, RightOutlined } from "@ant-design/icons";
import "./DetailPrompt.css";
import whatIcon from "../../../../asset/imgae/icon_what.svg";
import tipIcon from "../../../../asset/imgae/icon_tips.svg";
import howIcon from "../../../../asset/imgae/icon_what.svg";
import inputIcon from "../../../../asset/imgae/input_icon.svg";
import outputIcon from "../../../../asset/imgae/output_icon.svg";
import PromptCard from "../ListPrompts/PromptCard/PromptCard";
import copyIcon from "../../../../asset/icon/copy_icon.svg";
import { UserContext } from "../../../../context/AuthContext";
const DetailPrompt = () => {
    const location = useLocation();
    const { activeSection, image_category, topicName } = location.state || {};
    const { id } = useParams();
    const [prompt, setPrompt] = useState([]);
    const [copyStatus, setCopyStatus] = useState(false);
    const optimationRef = useRef(null);
    const [relatedPrompts, setRelatedPrompts] = useState([]);
    const [expandedSections, setExpandedSections] = useState({
        howToUse: false,
        exampleInput: false,
        exampleOutput: false,
        additionalTips: false,
        additionalInfo: false
    });
    const { user } = useContext(UserContext); // Lấy user từ Context API

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
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        if (id) {
            getDetailPrompt(id);
            window.scrollTo(0, 0);
        }
    }, [id]);

    const getDetailPrompt = async (id) => {
        try {
            const resp = await api.getPromptById(id);
            setPrompt(resp.data);
            getListRelatedPrompts(resp?.data?.Category?.id, resp?.data?.Topic?.id, resp?.data?.id)
        } catch (error) {

        }
    }
    const getListRelatedPrompts = async (category_id, topic_id, current_prompt_id) => {
        try {
            const resp = await api.getRelatedPrompts(current_prompt_id, category_id, topic_id);
            setRelatedPrompts(resp.data.data);
        } catch (error) {
            console.error("Error fetching newest prompts:", error);
        }
    }

    return (
        <div className="detail-prompt-component">
            <div className="detail-prompt-container">
                <div className="detail-prompt-content">
                    <div className="detail-prompt-header">
                        <div className="detail-prompt-header-section">
                            <img src={activeSection?.description} alt="ChatGPT" />
                            <span>ChatGPT Proms</span>
                        </div>
                        <div className="detail-prompt-premium-tag">
                            <div className="detail-prompt-premium-tag-new">New</div>
                            {prompt?.is_type === 2 ? (
                                <div className="detail-prompt-premium-tag-premium">
                                    <StarFilled /> Premium
                                </div>
                            ) : (
                                <div className="detail-prompt-premium-tag-free">
                                    Free
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="detail-prompt-title">
                        <h1>{prompt?.title}</h1>
                    </div>
                    <div className="detail-prompt-content-note">
                        <span style={{ fontSize: "204x" }}>💡 </span><div dangerouslySetInnerHTML={{ __html: prompt.content }} />
                    </div>
                    {prompt?.what && <div className="detail-prompt-paragraph" >
                        <div>
                            <h2 className="prompt-sub-title-paragraph"> <img src={whatIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />What This Prompt Does</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.what }} className="detail-prompt-paragraph-content" />
                    </div>}
                    {prompt?.tips && <div className="detail-prompt-paragraph">
                        <div>
                            <h2 className="prompt-sub-title-paragraph"><img src={tipIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />Tips</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.tips }} className="detail-prompt-paragraph-content" />
                    </div>
                    }

                    {prompt?.text && (
                        <div className="detail-prompt-paragraph-special">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                                <h2 className="prompt-sub-title-paragraph-special">
                                    <div dangerouslySetInnerHTML={{ __html: prompt.text }} />
                                </h2>
                            </div>
                            <div className={`detail-prompt-paragraph-special-content-box ${!user?.UserSub ? 'blurred' : ''}`}>
                                {user?.UserSub && (
                                    <button
                                        className="copy-button"
                                        onClick={copyToClipboard}
                                    >
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
                        </div>
                    )}

                    <div className="detail-prompt-section" onClick={() => toggleSection('howToUse')}>
                        <div className="detail-prompt-section-header">
                            <div className="detail-prompt-section-title">
                                <img src={howIcon} alt="How to use" />
                                <span>How To Use The Prompt</span>
                            </div>
                            <RightOutlined rotate={expandedSections.howToUse ? 90 : 0} />
                        </div>
                        {expandedSections.howToUse && (
                            <div className="detail-prompt-section-content">
                                <div dangerouslySetInnerHTML={{ __html: prompt.how }} />
                            </div>
                        )}
                    </div>

                    <div className="detail-prompt-section" onClick={() => toggleSection('exampleInput')}>
                        <div className="detail-prompt-section-header">
                            <div className="detail-prompt-section-title">
                                <img src={inputIcon} alt="Example input" />
                                <span>Example Input</span>
                            </div>
                            <RightOutlined rotate={expandedSections.exampleInput ? 90 : 0} />
                        </div>
                        {expandedSections.exampleInput && (
                            <div className="detail-prompt-section-content">
                                <div dangerouslySetInnerHTML={{ __html: prompt.input }} />
                            </div>
                        )}
                    </div>

                    <div className="detail-prompt-section" onClick={() => toggleSection('exampleOutput')}>
                        <div className="detail-prompt-section-header">
                            <div className="detail-prompt-section-title">
                                <img src={outputIcon} alt="Example output" />
                                <span>Example Output</span>
                            </div>
                            <RightOutlined rotate={expandedSections.exampleOutput ? 90 : 0} />
                        </div>
                        {expandedSections.exampleOutput && (
                            <div className="detail-prompt-section-content">
                                <div dangerouslySetInnerHTML={{ __html: prompt.output }} />
                            </div>
                        )}
                    </div>

                    <div className="detail-prompt-section" onClick={() => toggleSection('additionalTips')}>
                        <div className="detail-prompt-section-header">
                            <div className="detail-prompt-section-title">
                                <img src={tipIcon} alt="Additional tips" />
                                <span>Additional Tips</span>
                            </div>
                            <RightOutlined rotate={expandedSections.additionalTips ? 90 : 0} />
                        </div>
                        {expandedSections.additionalTips && (
                            <div className="detail-prompt-section-content">
                                <div dangerouslySetInnerHTML={{ __html: prompt.addtip }} />
                            </div>
                        )}
                    </div>

                    <div className="detail-prompt-section" onClick={() => toggleSection('additionalInfo')}>
                        <div className="detail-prompt-section-header">
                            <div className="detail-prompt-section-title">
                                <img src={whatIcon} alt="Additional information" />
                                <span>Additional Information</span>
                            </div>
                            <RightOutlined rotate={expandedSections.additionalInfo ? 90 : 0} />
                        </div>
                        {expandedSections.additionalInfo && (
                            <div className="detail-prompt-section-content">
                                <div dangerouslySetInnerHTML={{ __html: prompt.addinformation }} />
                            </div>
                        )}
                    </div>

                    {/* Danh sách prompt mới nhất */}
                    <div className="related-prompts-container">
                        <div className="related-prompts-title-box">
                            <h2>More Prompts:</h2>
                        </div>
                        <div className="related-prompt-list-wrapper">
                            <div className="related-prompt-list">
                                {relatedPrompts.map((prompt) => (
                                    <PromptCard
                                        key={prompt.id}
                                        prompt={prompt}
                                        image_category={prompt?.Category?.image_card}
                                        activeSection={activeSection}
                                    />))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default DetailPrompt;