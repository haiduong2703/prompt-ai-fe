import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import PromptCard from "../Prompt/ListPrompts/PromptCard/PromptCard";

const UserHome = () => {
  const examplePrompt1 = {
    id: 1,
    title: "Develop Deep Work Framework",
    short_description: "Unlock productivity and innovation with this ChatGPT mega-prompt...",
    category: { name: "Time Management" },
    image_section: "https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/6696e4762936cebcf55fcccb_ChatGPT%20Logo.avif",
    image_category: "https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/673deb92428198854254c129_ChatGPT%20Productivity%20%20icon.svg"
  };
  const examplePrompt2 = {
    id: 1,
    title: "Develop Deep Work Framework",
    short_description: "Develop a secure data handling protocol with this ChatGPT prompt, covering classification, encryption, training, and incident response.",
    category: { name: "Time Management" },
    image_section: "https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/6696e4762936cebcf55fcccb_ChatGPT%20Logo.avif",
    image_category: "https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/673deb92428198854254c129_ChatGPT%20Productivity%20%20icon.svg"
  };
  const examplePrompt3 = {
    id: 1,
    title: "Develop Deep Work Framework",
    short_description: "Develop a robust crisis communication plan with this ChatGPT prompt, covering stakeholder management, protocols, and media training.",
    category: { name: "Time Management" },
    image_section: "https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/6696e4762936cebcf55fcccb_ChatGPT%20Logo.avif",
    image_category: "https://cdn.prod.website-files.com/64808cc9f88d76f4355b870a/673deb92428198854254c129_ChatGPT%20Productivity%20%20icon.svg"
  };
  return (
    <div style={{display: "flex", justifyContent: "center", padding: "20px", gap: "20px"}}>
      <PromptCard prompt={examplePrompt1}/>
      <PromptCard prompt={examplePrompt2}/>
      <PromptCard prompt={examplePrompt3}/>
      <PromptCard prompt={examplePrompt2}/>
    </div>
  );
};

export default UserHome;
