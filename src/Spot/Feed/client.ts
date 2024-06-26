import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USER_API = `${BASE_API}/api/users`;
export const POST_API = `${BASE_API}/api/posts`;


const api = axios.create({
  withCredentials: true
});

export const getAllPosts = async () => {
    return await api.get(`${POST_API}`);
};
export const getUsersByUsername = async (username: string) => {
    const response = await axios.get(`${USER_API}?username=${encodeURIComponent(username)}`);
    return response.data;
};

export const getUsersById = async (_id: string) => {
    const response = await api.get(`${USER_API}/id/${encodeURIComponent(_id)}`);
    return response.data;
};

export const likePost = async (postId: string, userId: string) => {
    return await api.post(`${POST_API}/like/${encodeURIComponent(postId)}/${encodeURIComponent(userId)}`);
};
