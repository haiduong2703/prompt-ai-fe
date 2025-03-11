// src/services/api.js
import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://160.25.80.25:5000/api';
// const API_URL = 'http://backend:5000/api';

const API_URL = 'http://localhost:5000/api';



const api = {
    // Prompt APIs
    getPrompts: async (query) => {
        return axios.get(`${API_URL}/prompts?${query}`);
    },
    uploadImage: async (data) => {
        return axios.post(`${API_URL}/prompts/upload`, data);
    },
    getPromptById: async (id) => {
        return axios.get(`${API_URL}/prompts/${id}`);
    },

    createPrompt: async (promptData) => {
        return axios.post(`${API_URL}/prompts`, promptData);
    },

    updatePrompt: async (id, promptData) => {
        return axios.put(`${API_URL}/prompts/${id}`, promptData);
    },

    deletePrompt: async (id) => {
        return axios.delete(`${API_URL}/prompts/${id}`);
    },
    getPromptsByCategoryId: async (page = 1, pageSize = 12, category_id, topic_id, search_text, is_type) => {
        return axios.get(`${API_URL}/prompts/by-category?page=${page}&pageSize=${pageSize}&category_id=${category_id}&topic_id=${topic_id}&search_text=${search_text}&is_type=${is_type}`)
    },
    getPromptsContentByCategoryId: async (category_id) => {
        return axios.get(`${API_URL}/prompts/topics/by-category?category_id=${category_id}`)
    },
    getNewestPromptsByCategoryId: async (category_id) => {
        return axios.get(`${API_URL}/prompts/newest?category_id=${category_id}`)
    },
    getRelatedPrompts: async (current_id, category_id, topic_id) => {
        return axios.get(`${API_URL}/prompts/related?current_id=${current_id}&category_id=${category_id}&topic_id=${topic_id}`)
    },
    // Category APIs
    getCategories: async () => {
        return axios.get(`${API_URL}/categories`);
    },
    getCategoriesPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/categories?page=${page}&pageSize=${pageSize}`);
    },
    getCategoriesBySection: async (sectionId) => {
        return axios.get(`${API_URL}/categories/by-sectionId/${sectionId}`);
    },
    createCategories: async (promptData) => {
        return axios.post(`${API_URL}/categories`, promptData);
    },

    updateCategories: async (id, promptData) => {
        return axios.put(`${API_URL}/categories/${id}`, promptData);
    },

    deleteCategories: async (id) => {
        return axios.delete(`${API_URL}/categories/${id}`);
    },
    //Section APIS
    getSections: async () => {
        return axios.get(`${API_URL}/sections`);
    },
    //Topic APIS
    getTopics: async () => {
        return axios.get(`${API_URL}/topic`);
    },
    getTopicsPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/topic/list?page=${page}&pageSize=${pageSize}`);
    },
    createTopics: async (promptData) => {
        return axios.post(`${API_URL}/topic`, promptData);
    },

    updateTopics: async (id, promptData) => {
        return axios.put(`${API_URL}/topic/${id}`, promptData);
    },

    deleteTopics: async (id) => {
        return axios.delete(`${API_URL}/topic/${id}`);
    },
    //Contact APIS
    getContacts: async () => {
        return axios.get(`${API_URL}/contact`);
    },
    getContactsPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/contact/list?page=${page}&pageSize=${pageSize}`);
    },
    sendContacts: async (data) => {
        return axios.post(`${API_URL}/contact`, data);
    },
    repContacts: async (id, data) => {
        return axios.put(`${API_URL}/contact/${id}`, {
            reply: data
        });
    },
    //Sub
    getSubPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/subscriptions/list?page=${page}&pageSize=${pageSize}`);
    },
    createSub: async (promptData) => {
        return axios.post(`${API_URL}/subscriptions`, promptData);
    },

    updateSub: async (id, promptData) => {
        return axios.put(`${API_URL}/subscriptions/${id}`, promptData);
    },
    deleteSub: async (id) => {
        return axios.delete(`${API_URL}/subscriptions/${id}`);
    },
    getSubDuration: async (duration) => {
        return axios.get(`${API_URL}/subscriptions/by-duration?duration=${duration}`);
    },
    //Blogs

    getBlogById: async (id) => {
        return axios.get(`${API_URL}/blog/${id}`);
    },
    getBlogPage: async (page = 1, pageSize = 10, search) => {
        return axios.get(`${API_URL}/blog/list?page=${page}&pageSize=${pageSize}&search=${search}`);
    },
    createBlog: async (promptData) => {
        return axios.post(`${API_URL}/blog`, promptData);
    },

    updateBlog: async (id, promptData) => {
        return axios.put(`${API_URL}/blog/${id}`, promptData);
    },
    //Blogs Categories
    getBlogCategory: async () => {
        return axios.get(`${API_URL}/blogcategory`);
    },
    getBlogCategoryPage: async () => {
        return axios.get(`${API_URL}/blogcategory/list`);
    },
    createBlogCategory: async (promptData) => {
        return axios.post(`${API_URL}/blogcategory`, promptData);
    },

    updateBlogCategory: async (id, promptData) => {
        return axios.put(`${API_URL}/blogcategory/${id}`, promptData);
    },
    deleteBlogCategory: async (id) => {
        return axios.delete(`${API_URL}/blogcategory/${id}`);
    },
    //User 
    loginUser: async (email) => {
        return axios.post(`${API_URL}/users/login`, { email }, {
            headers: { "Content-Type": "application/json" }
        });
    },
    verifyLogin: async (email, otp) => {
        return axios.post(`${API_URL}/users/login-verify`, { email, otp }, {
            headers: { "Content-Type": "application/json" }
        });
    },
    registerUser: async (fullName, email, password) => {
        return axios.post(`${API_URL}/users/register`, { full_name: fullName, email, password }, {
            headers: { "Content-Type": "application/json" }
        });
    },
};

export default api;