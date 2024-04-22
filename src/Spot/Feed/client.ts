import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USER_API = `${BASE_API}/api/users`;

const api = axios.create({
  withCredentials: true
});

export const getUsersByUsername = async (username: string) => {
    const response = await axios.get(`${USER_API}?username=${encodeURIComponent(username)}`);
    return response.data;
};
