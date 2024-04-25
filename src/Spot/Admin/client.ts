import axios from "axios";
import exp from "constants";
import User from '../Interfaces/User';
import GymSplit from '../Interfaces/GymSplit';
import MealPlan from '../Interfaces/MealPlan';
import GymStatistic from '../Interfaces/GymStatistic';
import PostData from '../Interfaces/PostData';
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USER_API = `${BASE_API}/api/users`;
export const POST_API = `${BASE_API}/api/posts`;
export const ADMIN_API = `${BASE_API}/api/admins`;
export const GYMSPLIT_API = `${BASE_API}/api/gymSplits`;
export const GYMSTATS_API = `${BASE_API}/api/gymStatistics`;
export const MEALPLAN_API = `${BASE_API}/api/mealplans`;


const api = axios.create({
    withCredentials: true
  });

export const getUsersByUsername = async (username: string) => {
    const response = await api.get(`${USER_API}?username=${encodeURIComponent(username)}`);
    return response.data;
};

export const deleteUser = async (_id: string) => {
    console.log('username',`${USER_API}/${encodeURIComponent(_id)}`);
    const response = await api.delete(`${USER_API}/${encodeURIComponent(_id)}`);
    return response.data;
};

export const updateUser = async (username: string, data: User) => {
    const response = await api.put(`${USER_API}?username=${encodeURIComponent(username)}`, data);
    return response.data;
};

export const getPostById = async (id: string) => {
    const response = await api.get(`${POST_API}/${encodeURIComponent(id)}`);
    return response.data;
};

export const getGymSplitsById = async (id: string) => {
    const response = await api.get(`${GYMSPLIT_API}/${encodeURIComponent(id)}`);
    return response.data;
};

export const getGymStatisticsById = async (id: string) => {
    const response = await api.get(`${GYMSTATS_API}/${encodeURIComponent(id)}`);
    return response.data;
};

export const getMealPlanById = async (id: string) => {
    const response = await api.get(`${MEALPLAN_API}/${encodeURIComponent(id)}`);
    return response.data;
};

export const deleteGymSplit = async (_id: string) => {
    const response = await api.delete(`${GYMSPLIT_API}/${encodeURIComponent(_id)}`);
    return response.data;
};

export const deletePost = async (_id: string) => {
    const response = await api.delete(`${POST_API}/${encodeURIComponent(_id)}`);
    return response.data;
};

export const deleteGymStats = async (_id: string) => {
    const response = await api.delete(`${GYMSTATS_API}/${encodeURIComponent(_id)}`);
    return response.data;
};

export const deleteMealPlan = async (_id: string) => {
    const response = await api.delete(`${MEALPLAN_API}/${encodeURIComponent(_id)}`);
    return response.data;
};

export const updateGymSplit = async (id: string, data: GymSplit) => {
    const response = await api.put(`${GYMSPLIT_API}/${encodeURIComponent(id)}`, data);
    return response.data;
};

export const updateGymStats = async (id: string, data: GymStatistic) => {
    const response = await api.put(`${GYMSTATS_API}/${encodeURIComponent(id)}`, data);
    return response.data;
};

export const updateMealPlan = async (id: string, data: MealPlan) => {
    const response = await api.put(`${MEALPLAN_API}/${encodeURIComponent(id)}`, data);
    return response.data;
};

export const updatePost = async (id: string, data: PostData) => {
    const response = await api.put(`${POST_API}/${encodeURIComponent(id)}`, data);
    return response.data;
};

export const adminSignin = async (credentials: { username: string; password: string }) => {
    const response = await api.post(`${ADMIN_API}/signin`, credentials);
    return response.data;
};

export const getAdminById = async (adminId: string) => {
    const response = await api.get(`${ADMIN_API}/${encodeURIComponent(adminId)}`);
    return response.data;
};

export const createAdmin = async (adminData: { firstName: string, lastName: string, username: string, password: string }) => {
    const response = await api.post(`${ADMIN_API}`, adminData);
    return response.data;
};



