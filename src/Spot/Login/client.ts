import axios from "axios";
import SignupUser from '../Interfaces/SignupUser';
import User from '../Interfaces/User'; // Adjust the path as necessary

// Base URL for API requests
export const BASE_API = process.env.REACT_APP_API_BASE || 'http://localhost:4000';
export const USERS_API = `${BASE_API}/api/users`; 

// Axios instance with credentials
const api = axios.create({ withCredentials: true });

// Function to create a new user
export const createUser = async (user: User) => {
  const response = await api.post(`${USERS_API}`, user);
  return response.data;
};

// Function to update an existing user
export const updateUser = async (userId: string, user: User) => {
  const response = await api.put(`${USERS_API}/${userId}`, user);
  return response.data;
};

// Function to delete a user
export const deleteUser = async (userId: string) => {
  const response = await api.delete(`${USERS_API}/${userId}`);
  return response.data;
};

// Function to find a user by ID
export const findUserById = async (userId: string) => {
  const response = await api.get(`${USERS_API}/${userId}`);
  return response.data;
};

// Function to find all users or by username
export const findAllUsers = async (username?: string) => {
  const response = await api.get(`${USERS_API}`, { params: { username } });
  return response.data;
};

// Function to sign up a new user
export const signup = async (user: SignupUser) => {
    const response = await api.post(`${USERS_API}/signup`, user);
    return response.data;
  };

// Function to sign in
export const signin = async (credentials: Pick<User, 'username' | 'password'>) => {
  const response = await api.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

// Function to sign out
export const signout = async () => {
  const response = await api.post(`${USERS_API}/signout`);
  return response.data;
};

// Function to get the profile of the signed-in user
export const profile = async () => {
  const response = await api.post(`${USERS_API}/profile`);
  return response.data;
};
