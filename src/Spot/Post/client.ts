import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const POST_API = `${BASE_API}/api/posts`;

export interface Post {
    imageUrl: string;
    songImageUrl: string;
    songName: string;
    artistName: string;
    likes: string[]; // Array of user IDs as strings
}

const api = axios.create({
  withCredentials: true
});


export const createPost = async (post: Post) => {
    const response = await api.post(`${POST_API}`, post);
    return response.data;
  };

