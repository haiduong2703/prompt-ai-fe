import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";

const UserHome = () => {
  return (
    <div style={{ display: "flex", gap: "30px", justifyContent: "center", padding: "30px" }}>
      <CategoryCard 
        title="Sales" 
        count={252} 
        icon="https://cdn.prod.website-files.com/64808e3805a22fc1ca46ffe9/67169348883cdcb341172fc7_671692ecc03e3e478aec3352_ChatGPT%2520Sales%2520icon.svg" 
        createdAt="2025-02-25T10:00:00.000Z"
      />
      <CategoryCard 
        title="Education" 
        count={276} 
        icon="https://cdn.prod.website-files.com/64808e3805a22fc1ca46ffe9/6716a50eae89617d8e94b04c_671692ec9adcadceeac1746c_ChatGPT%2520Real%2520Writing%2520icon.svg" 
        createdAt="2024-02-10T10:00:00.000Z"
      />
      <CategoryCard 
        title="Marketing" 
        count={177} 
        icon="https://cdn.prod.website-files.com/64808e3805a22fc1ca46ffe9/6716934e28f888aee19f7b22_671692ec87821b84f263ef9f_ChatGPT%2520Marketing%2520icon.svg" 
        createdAt="2023-12-01T10:00:00.000Z"
      />
    </div>
  );
};

export default UserHome;
