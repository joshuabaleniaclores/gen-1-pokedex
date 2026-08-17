import axios from 'axios'
import type { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_POKEAPI_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})