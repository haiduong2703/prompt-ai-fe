import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../../../../services/api";
import { HomeOutlined, StarFilled, HeartOutlined } from "@ant-design/icons";


const DetailPrompt = () => {
    const location = useLocation();
    const { promptId } = location.state || {};

    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        getDetailPrompt(promptId);
    }, [])
    const getDetailPrompt = async (id) => {
        try {
            const resp = await api.getPromptById(id);
            setPrompts(resp.data);
        } catch (error) {

        }
    }
    return (
        <div className="detail-prompt-component">
            <div className="detail-prompt-container">
                {/* Breadcrumb */}
                <div className="detail-prompt-breadcrumb">
                    <Link to="/prompts" style={{ color: "black" }}>
                        <HomeOutlined style={{ fontSize: "20px" }} />
                    </Link>
                    <span>
                        &gt; <img src="" alt="section" />
                        Prompts for
                    </span>
                </div>
                <div className="detail-prompt-content">
                    <div className="detail-prompt-header">
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <div className="detail-prompt-premium-tag"></div>
                    </div>
                    <div className="detail-prompt-title">

                    </div>
                    {prompts?.what && <div className="detail-prompt-what" >
                        <div>
                            <h2>What This Prompt Does</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.what }} />
                    </div>}
                    {prompts?.tips && <div className="detail-prompt-tips">
                        <div>
                            <h2>Tips</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.tips }} />
                    </div>
                    }
                    {prompts?.text && <div className="detail-prompt-text">
                        <div>
                            <h2>Excel Function Tutor
                            ChatGPT Prompt</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.text }} />
                    </div>}
                    {prompts?.how && <div className="detail-prompt-how">
                        <div>
                            <h2>How To Use The Prompt:</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.how }} />
                        <div>
                            <h2>Example Input:</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.what }} /></div>}
                    {prompts?.input && <div className="detail-prompt-input">
                        <div>
                            <h2>Example Output:
                            </h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.what }} /></div>}
                    {prompts?.output && <div className="detail-prompt-output">
                        <div>
                            <h2>Tips</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.what }} /></div>}
                    {prompts?.addtip && <div className="detail-prompt-addstip">
                        <div>
                            <h2>Tips</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.what }} /></div>}
                    {prompts?.addinformation && <div className="detail-prompt-addsinfo">
                        <div>
                            <h2>Tips</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: prompts.what }} /></div>}

                </div>
            </div>
        </div>
    );
};

export default DetailPrompt;