// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
    // Prompt APIs
    getPrompts: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/prompts?page=${page}&pageSize=${pageSize}`);
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

    // Category APIs
    getCategories: async () => {
        return axios.get(`${API_URL}/categories`);
    },
    getCategoriesPage: async (page = 1, pageSize = 10) => {
        return axios.get(`${API_URL}/categories/list?page=${page}&pageSize=${pageSize}`);
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
    }
};

export default api;