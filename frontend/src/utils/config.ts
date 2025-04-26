import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const api = axios.create({
	withCredentials: true,
	baseURL: baseUrl,
});