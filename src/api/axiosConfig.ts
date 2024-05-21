import axios from "axios";

// "http://localhost:8080/api/v1"
axios.defaults.baseURL = "http://172.16.180.154:8080/api/v1";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const learner = localStorage.getItem("learner");
      const token = localStorage.getItem("token");
      if (learner !== null || token !== null) {
        localStorage.removeItem("token");
        localStorage.removeItem("learner");
        window.location.href = "http://172.16.180.154:3000/login";
      }
    }
    return Promise.reject(error);
  }
);

export function setHeader() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function resetHeader() {
  axios.defaults.headers.common.Authorization = null;
}

export { axios };
