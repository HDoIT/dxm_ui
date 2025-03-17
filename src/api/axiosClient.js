import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:9123",
  // baseURL: "https://dxm-be.onrender.com",
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
