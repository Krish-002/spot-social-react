import axios from "axios";
import User from "../Interfaces/User";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const POST_API = `${BASE_API}/api/posts`;
export const USER_API = `${BASE_API}/api/users`;


const api = axios.create({
  withCredentials: true
});

export const createPost = async (formData: FormData) => {
    const response = await api.post(POST_API, formData);
    return response.data;
};

export const updateUser = async (_id: string, data: User) => {
    const response = await api.put(`${USER_API}/${encodeURIComponent(_id)}`, data);
    return response.data;
};
