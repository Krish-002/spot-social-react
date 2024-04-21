import axios, { AxiosResponse } from 'axios';
import { setAuthHeader } from './Functions';
// Define interfaces for the expected structure of params and response data if needed
interface Params {
    [key: string]: any;  // Use a more specific type if possible for your use case
}

// Generic typing can be applied if the response structure is known
export const get = async <T = any>(url: string, params?: Params): Promise<T> => {
    setAuthHeader();
    const result: AxiosResponse<T> = await axios.get<T>(url, { params });
    return result.data;
};

export const post = async <T = any>(url: string, params?: Params): Promise<T> => {
    setAuthHeader();
    const result: AxiosResponse<T> = await axios.post<T>(url, params);
    return result.data;
};
