import axios, { InternalAxiosRequestConfig } from "axios"
import API_CONFIG from "./config"

const $api = axios.create({
    baseURL: `${API_CONFIG.base_url}/${API_CONFIG.version}`
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.Accept = 'application/json'
    config.headers['X-API-KEY'] = API_CONFIG.key
    return config
})

export default $api