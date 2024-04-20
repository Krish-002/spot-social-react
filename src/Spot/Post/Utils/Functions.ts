import axios from 'axios';

// Define a type for the object returned by getParamValues
interface ParamValues {
  [key: string]: string;
}

// Function to parse URL and return parameters as an object
export const getParamValues = (url: string): ParamValues => {
  return url
    .slice(1)
    .split('&')
    .reduce<ParamValues>((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};

// Function to set the authorization header for axios requests
export const setAuthHeader = (): void => {
  try {
    const paramsString = localStorage.getItem('params');
    if (paramsString) {
      const params = JSON.parse(paramsString) as ParamValues;
      if (params.access_token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${params.access_token}`;
      }
    }
  } catch (error) {
    console.error('Error setting auth', error);
  }
};
