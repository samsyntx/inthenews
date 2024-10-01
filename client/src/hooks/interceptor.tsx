import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
    AxiosHeaders,
  } from "axios";
  
  const apiUrl = process.env.REACT_APP_API_URL as string;
  
  const Axios = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
  });
  
  Axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const auth = localStorage.getItem("tokens");
      let token;
  
      if (auth) {
        token = JSON.parse(auth).accessToken;
      }
  
      if (token) {
        config.headers = new AxiosHeaders({
          ...config.headers,
          Authorization: `Bearer ${token}`,
        });
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
      } else if (error.response && error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
      return Promise.reject(error);
    }
  );
  
  export default Axios;