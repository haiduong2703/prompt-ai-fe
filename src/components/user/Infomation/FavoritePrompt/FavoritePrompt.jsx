import api from "../../../../services/api";
import { useState, useEffect } from "react";
import "./FavoritePrompt.css";
import PromptCard from "../../Prompt/ListPrompts/PromptCard/PromptCard";

const FavoritePrompts = (user) => {
    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState('all');
    const [favoritePrompts, setFavoritePrompts] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getSections().then(res => {
            setSections(res.data);
        });
        getFavoritePrompts();
    }, []);

    useEffect(() => {
        handleFindFavoritePrompts();
    }, [activeSection]);

    const handleFindFavoritePrompts = async () => {
        try {
            setLoading(true);
            const res = await api.getFavoritePromptsByUserId(user.user?.id, activeSection);
            setFavoritePrompts(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getFavoritePrompts = async () => {
        try {
            const resp = await api.getFavoritePrompts(user.user?.id);
            setFavoriteList(resp.data);
        } catch (error) {
            console.error("Error fetching favorite prompts:", error);
        }
    }

    const renderPromptCards = () => {
        if (loading) {
            return <div className="loading-state">Đang tải...</div>;
        }
        
        if (favoritePrompts.length === 0) {
            return (
                <div className="empty-state">
                    <p>Bạn chưa có Prompt yêu thích nào!</p>
                    <p className="empty-state-subtitle">Hãy khám phá và thêm các prompt yêu thích của bạn.</p>
                </div>
            );
        }
        
        return (
            <div className="info-favorite-prompt-list">
                {favoritePrompts.map((favorPrompt) => (
                    <div className="prompt-card-wrapper" key={favorPrompt.Prompt.id}>
                        <PromptCard
                            prompt={favorPrompt.Prompt}
                            favoriteList={favoriteList}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="info-favorite-prompt">
            <h1>Prompt yêu thích</h1>
            <p>Xem các Prompts yêu thích của bạn theo danh mục dưới đây!</p>

            <div className="info-favorite-section-filter">
                <button
                    className={`info-favorite-section-button ${activeSection === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveSection('all')}
                >
                    All
                </button>

                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`info-favorite-section-button ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        {section.name}
                    </button>
                ))}
            </div>

            {renderPromptCards()}
        </div>
    );
};

export default FavoritePrompts;