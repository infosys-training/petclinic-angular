import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.status, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return Promise.reject(error);
  },
);

export default httpClient;
