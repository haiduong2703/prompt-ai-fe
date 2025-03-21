import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Tạo instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để thêm token vào header của mỗi request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const api = {
    // Prompt APIs
    getPrompts: async (query) => {
        return axiosInstance.get(`/prompts?${query}`);
    },
    uploadImage: async (data) => {
        return axiosInstance.post(`/prompts/upload`, data);
    },
    getPromptById: async (id) => {
        return axiosInstance.get(`/prompts/${id}`);
    },
    createPrompt: async (promptData) => {
        return axiosInstance.post(`/prompts`, promptData);
    },
    updatePrompt: async (id, promptData) => {
        return axiosInstance.put(`/prompts/${id}`, promptData);
    },
    deletePrompt: async (id) => {
        return axiosInstance.delete(`/prompts/${id}`);
    },
    getPromptsByCategoryId: async (page = 1, pageSize = 12, category_id, topic_id, search_text, is_type) => {
        return axiosInstance.get(`/prompts/by-category?page=${page}&pageSize=${pageSize}&category_id=${category_id}&topic_id=${topic_id}&search_text=${search_text}&is_type=${is_type}`);
    },
    getPromptsContentByCategoryId: async (category_id) => {
        return axiosInstance.get(`/prompts/topics/by-category?category_id=${category_id}`);
    },
    getNewestPromptsByCategoryId: async (category_id) => {
        return axiosInstance.get(`/prompts/newest?category_id=${category_id}`);
    },
    getRelatedPrompts: async (current_id, category_id, topic_id) => {
        return axiosInstance.get(`/prompts/related?current_id=${current_id}&category_id=${category_id}&topic_id=${topic_id}`);
    },
    // Category APIs
    getCategories: async () => {
        return axiosInstance.get(`/categories`);
    },
    getCategoriesPage: async (page = 1, pageSize = 10) => {
        return axiosInstance.get(`/categories?page=${page}&pageSize=${pageSize}`);
    },
    getCategoriesBySection: async (sectionId) => {
        return axiosInstance.get(`/categories/by-sectionId/${sectionId}`);
    },
    createCategories: async (promptData) => {
        return axiosInstance.post(`/categories`, promptData);
    },
    updateCategories: async (id, promptData) => {
        return axiosInstance.put(`/categories/${id}`, promptData);
    },
    deleteCategories: async (id) => {
        return axiosInstance.delete(`/categories/${id}`);
    },
    // Section APIs
    getSections: async () => {
        return axiosInstance.get(`/sections`);
    },
    // Topic APIs
    getTopics: async () => {
        return axiosInstance.get(`/topic`);
    },
    getTopicsPage: async (page = 1, pageSize = 10) => {
        return axiosInstance.get(`/topic/list?page=${page}&pageSize=${pageSize}`);
    },
    createTopics: async (promptData) => {
        return axiosInstance.post(`/topic`, promptData);
    },
    updateTopics: async (id, promptData) => {
        return axiosInstance.put(`/topic/${id}`, promptData);
    },
    deleteTopics: async (id) => {
        return axiosInstance.delete(`/topic/${id}`);
    },
    // Contact APIs
    getContacts: async () => {
        return axiosInstance.get(`/contact`);
    },
    getContactsPage: async (page = 1, pageSize = 10) => {
        return axiosInstance.get(`/contact/list?page=${page}&pageSize=${pageSize}`);
    },
    sendContacts: async (data) => {
        return axiosInstance.post(`/contact`, data);
    },
    repContacts: async (id, data) => {
        return axiosInstance.put(`/contact/${id}`, { reply: data });
    },
    // Sub APIs
    getSubPage: async (page = 1, pageSize = 10) => {
        return axiosInstance.get(`/subscriptions/list?page=${page}&pageSize=${pageSize}`);
    },
    createSub: async (promptData) => {
        return axiosInstance.post(`/subscriptions`, promptData);
    },
    updateSub: async (id, promptData) => {
        return axiosInstance.put(`/subscriptions/${id}`, promptData);
    },
    deleteSub: async (id) => {
        return axiosInstance.delete(`/subscriptions/${id}`);
    },
    getSubDuration: async (duration) => {
        return axiosInstance.get(`/subscriptions/by-duration?duration=${duration}`);
    },
    getSubByDurationAndType: async (duration, type) => {
        return axiosInstance.get(`/subscriptions/by-duration-and-type?duration=${duration}&type=${type}`);
    },
    // Blog APIs
    getBlogById: async (id) => {
        return axiosInstance.get(`/blog/${id}`);
    },
    getBlogPage: async (page = 1, pageSize = 10, search) => {
        return axiosInstance.get(`/blog/list?page=${page}&pageSize=${pageSize}&search=${search}`);
    },
    createBlog: async (promptData) => {
        return axiosInstance.post(`/blog`, promptData);
    },
    updateBlog: async (id, promptData) => {
        return axiosInstance.put(`/blog/${id}`, promptData);
    },
    // Blog Category APIs
    getBlogCategory: async () => {
        return axiosInstance.get(`/blogcategory`);
    },
    getBlogCategoryPage: async () => {
        return axiosInstance.get(`/blogcategory/list`);
    },
    createBlogCategory: async (promptData) => {
        return axiosInstance.post(`/blogcategory`, promptData);
    },
    updateBlogCategory: async (id, promptData) => {
        return axiosInstance.put(`/blogcategory/${id}`, promptData);
    },
    deleteBlogCategory: async (id) => {
        return axiosInstance.delete(`/blogcategory/${id}`);
    },
    // User APIs
    loginUser: async (email) => {
        const response = await axiosInstance.post(`/users/login`, { email });
        const { token } = response.data; // Lấy token từ response
        if (token) {
            localStorage.setItem('token', token); // Lưu token vào localStorage
        }
        return response;
    },
    verifyLogin: async (email, otp, userIP) => {
        const response = await axiosInstance.post(`/users/login-verify`, { email, otp, ip_address: userIP });
        const { token } = response.data; // Lấy token từ response
        if (token) {
            localStorage.setItem('token', token); // Lưu token vào localStorage
        }
        return response;
    },
    verifyOTP: async (email, otp) => {
        return axiosInstance.post(`/users/verify-otp`, { email, otp });
    },
    registerUser: async (fullName, email, password) => {
        return axiosInstance.post(`/users/register`, { full_name: fullName, email, password });
    },
    updateCount: async (id) => {
        return axiosInstance.put(`/users/count-prompt/${id}`);
    },
    getUserInfo: async (id) => {
        return axiosInstance.get(`/users/${id}`);
    },
    updateUserInfo: async (id, data) => {
        return axiosInstance.put(`/users/update-info/${id}`, data);
    },
    changePassword: async (id, password, newPassword) => {
        return axiosInstance.put(`/users/change-password/${id}?password=${password}&newPassword=${newPassword}`);
    },
    // Like Prompt APIs
    getFavoritePrompts: async (userId) => {
        return axiosInstance.get(`/promptfavorite/${userId}`);
    },
    addFavoritePrompt: async (promptId, userId) => {
        return axiosInstance.post(`/promptfavorite`, { prompt_id: promptId, user_id: userId });
    },
    removeFavoritePrompt: async (id) => {
        return axiosInstance.delete(`/promptfavorite/${id}`);
    },
    // Product APIs
    getProducts: async (page = 1, pageSize = 10) => {
        return axiosInstance.get(`/products?page=${page}&pageSize=${pageSize}`);
    },
    createProduct: async (promptData) => {
        return axiosInstance.post(`/products`, promptData);
    },
    updateProduct: async (id, promptData) => {
        return axiosInstance.put(`/products/${id}`, promptData);
    },
    deleteProduct: async (id) => {
        return axiosInstance.delete(`/products/${id}`);
    },
    getFavoritePromptsByUserId: async (userId, sectionId) => {
        return axiosInstance.get(`/promptfavorite/list/by-section?user_id=${userId}&section_id=${sectionId}`);
    },
    // Device Log APIs
    getDeviceLog: async (userId) => {
        return axiosInstance.get(`/devicelogs/${userId}`);
    },
};

export default api;