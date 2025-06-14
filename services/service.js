// services/faqService.js

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getFaqs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/faq`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        throw error;
    }
};

export const getAboutUs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/about`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch About Us:', error);
        throw error;
    }
}

export const getSettings = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/setting`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Settings:', error);
        throw error;
    }
}

// a function for post send contact data to backend
export const sendContactData = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/contact`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to send contact data:', error);
        throw error;
    }
};

// a function for post send contact data to backend
export const sendApplyFormData = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/applyjob`, data, {
            headers: {
                'Content-Type': 'multipart/form-data', // optional, Axios can infer this
            },
        });
        return response;
    } catch (error) {
        console.error('Failed to send apply form data:', error);
        throw error;
    }
};

// get banner data from backend
export const getBanner = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/banners`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Banners:', error);
        throw error;
    }
};

// get service category data from backend
export const getServiceCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/service/category`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Service Categories:', error);
        throw error;
    }
};

// service sub category by id
export const getServiceSubCatById = async (id) => {   
    try {
        const response = await axios.get(`${API_BASE_URL}/api/service/subcategory/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Service by ID:', error);
        throw error;
    }
}

// get all blogs
export const getAllBlogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/blogs`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Blogs:', error);
        throw error;
    }
};

// get single blog by id
export const getBlogById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Blog by ID:', error);
        throw error;
    }
}

// get function for gallery
export const getGallery = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/gallery`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Gallery:', error);
        throw error;
    }
}


