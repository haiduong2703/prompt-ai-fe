import api from "../../../../services/api";
import { useState, useEffect } from "react";
import "./FavoritePrompt.css";
import PromptCard from "../../Prompt/ListPrompts/PromptCard/PromptCard";
const FavoritePrompts = (user) => {
    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState('all');
    const [favoritePrompts, setFavoritePrompts] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);

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
            const res = await api.getFavoritePromptsByUserId(user.user?.id, activeSection);
            setFavoritePrompts(res.data.data);
        } catch (error) {
            console.log(error);
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

            <div className="info-user-profile">
                <div className="info-favorite-prompt-list">
                    {favoritePrompts.length === 0 ? (
                        <p>Bạn chưa có Prompt yêu thích nào!</p>
                    ) : (
                        favoritePrompts.map((favorPrompt) => (
                            <PromptCard
                                key={favorPrompt.Prompt.id}
                                prompt={favorPrompt.Prompt}
                                favoriteList={favoriteList}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritePrompts;