import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const POST_API = `${BASE_API}/api/posts`;

const api = axios.create({
  withCredentials: true
});

export const createPost = async (formData: FormData) => {
    const response = await api.post(POST_API, formData);
    return response.data;
};
