import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import api from "../../../../services/api";
import { HomeOutlined, StarFilled, HeartOutlined, CheckOutlined, CopyOutlined } from "@ant-design/icons";
import "./DetailPrompt.css";
import whatIcon from "../../../../asset/imgae/icon_what.svg";
import tipIcon from "../../../../asset/imgae/icon_tips.svg";
import howIcon from "../../../../asset/imgae/icon_what.svg";
import inputIcon from "../../../../asset/imgae/input_icon.svg";
import outputIcon from "../../../../asset/imgae/output_icon.svg";
import PromptCard from "../ListPrompts/PromptCard/PromptCard";

const DetailPrompt = () => {
    const location = useLocation();
    const { activeSection, image_category, topicName } = location.state || {};
    const { id } = useParams(); 
    const [prompt, setPrompt] = useState([]);
    const [copyStatus, setCopyStatus] = useState(false);
    const optimationRef = useRef(null);
    const [relatedPrompts, setRelatedPrompts] = useState([]);

    const copyToClipboard = () => {
        if (optimationRef.current) {
            const text = optimationRef.current.innerText; // Lấy nội dung text, bỏ thẻ HTML
            navigator.clipboard.writeText(text).then(() => {
                setCopyStatus(true);
                setTimeout(() => setCopyStatus(false), 2000); // Reset trạng thái sau 2s
            });
        }
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
                {/* Breadcrumb */}
                <div className="detail-prompt-breadcrumb">
                    <Link to="/prompts">
                        <HomeOutlined style={{ fontSize: "22px" }} />
                    </Link>
                    <span>
                        &gt; <img src={activeSection?.description} alt="" style={{ width: "22px", height: "22px" }} /> {activeSection?.name} Prompts for Sales
                    </span>
                    <span>
                        &gt; {topicName}
                    </span>
                    <span style={{ fontWeight: "700" }}>
                        &gt; {prompt.title}
                    </span>
                </div>
                <div className="detail-prompt-content">
                    <div className="detail-prompt-header">
                        <img src={activeSection?.description} alt="" className="detail-prompt-header-section" />
                        <img src={image_category} alt="" className="detail-prompt-header-category" />
                        <div className="detail-prompt-premium-tag">
                            {prompt?.is_type == 1 ? (
                                <>
                                    Free
                                </>
                            ) : (
                                <>
                                    <StarFilled style={{ color: "#ffd700" }} /> Premium
                                </>
                            )}
                        </div>
                    </div>
                    <div className="detail-prompt-title">
                        <h1>{activeSection?.name} Prompt to</h1>
                        <h2>{prompt?.title}</h2>
                    </div>
                    <div className="detail-prompt-content-note">
                        <span style={{ fontSize: "20px" }}>💡 </span><div dangerouslySetInnerHTML={{ __html: prompt.content }} />
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
                            <div className="detail-prompt-paragraph-special-content-box">
                                <button
                                    className="copy-button"
                                    onClick={copyToClipboard}
                                >
                                    {copyStatus ? "COPIED" : "COPY"}
                                </button>
                                <div
                                    className="detail-prompt-paragraph-special-content"
                                    ref={optimationRef}
                                    dangerouslySetInnerHTML={{ __html: prompt.OptimationGuide }}
                                />
                            </div>

                        </div>
                    )}


                    {prompt?.how && <div className="detail-prompt-paragraph">
                        <div>
                            <h2 className="prompt-sub-title-paragraph"><img src={howIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />How To Use The Prompt:</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.how }} className="detail-prompt-paragraph-content" /></div>}
                    {prompt?.input && <div className="detail-prompt-paragraph">
                        <div>
                            <h2 className="prompt-sub-title-paragraph"><img src={inputIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />Example Input:
                            </h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.input }} className="detail-prompt-paragraph-content" /></div>}
                    {prompt?.output && <div className="detail-prompt-paragraph">
                        <div>
                            <h2 className="prompt-sub-title-paragraph"><img src={outputIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />Example Output:</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.output }} className="detail-prompt-paragraph-content" /></div>}
                    {prompt?.addtip && <div className="detail-prompt-paragraph">
                        <div>
                            <h2 className="prompt-sub-title-paragraph"><img src={tipIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />Additional Tips:</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.addtip }} className="detail-prompt-paragraph-content" /></div>}
                    {prompt?.addinformation && <div className="detail-prompt-paragraph">
                        <div>
                            <h2 className="prompt-sub-title-paragraph"><img src={howIcon} alt="icon" style={{ width: "24px", height: "24px", marginRight: "8px" }} />Additional Information:</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompt.addinformation }} className="detail-prompt-paragraph-content" /></div>}
                    {/* Danh sách prompt mới nhất */}
                    <div className="related-prompts-container">
                        <div className="related-prompts-title-box">
                            <h2>🔗 Related Prompts:</h2>
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