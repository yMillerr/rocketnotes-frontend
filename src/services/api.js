import axios from "axios";

export const api = axios.create({
    baseURL: "https://rocketnotes-api-30f5.onrender.com"
})