import { store } from '@/redux/store'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) {
	throw new Error('VITE_API_BASE_URL is not defined in your .env file')
}

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosInstance.interceptors.request.use(config => {
	const token = store.getState().auth.accessToken
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
