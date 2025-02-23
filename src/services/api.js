// src/services/api.js
import axios from 'axios';

// const API_URL = 'http://160.25.80.25:5000/api';
const API_URL = 'http://localhost:5000/api';


const api = {
    // Prompt APIs
    getPrompts: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/prompts?page=${page}&pageSize=${pageSize}`);
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
        return axios.get(`${API_URL}/categories/list?page=${page}&pageSize=${pageSize}`);
    },
    getCategoriesBySection: async (sectionId) => {
        return axios.get(`${API_URL}/categories/by-sectionId/${sectionId}`);
    },
    //Section APIS
    getSections: async () => {
        return axios.get(`${API_URL}/sections`);
    },
    //Topic APIS
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
    //Sub
    getSubPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/subscriptions/list?page=${page}&pageSize=${pageSize}`);
    },
    //Blogs
    getBlogPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/blog/list?page=${page}&pageSize=${pageSize}`);
    },
};

export default api;