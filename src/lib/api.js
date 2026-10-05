import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
export const alumniApi = {
  // Registration
  register: (data) => api.post("/alumni/register/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  getRegistrationStatus: (studentId) => api.get(`/alumni/registration-status/?student_id=${studentId}`),
  // Profile
  getProfile: () => api.get("/alumni/profile/"),
  updateProfile: (data) => api.put("/alumni/profile/", data),
  // Directory
  getDirectory: (params) => api.get("/alumni/directory/", { params }),
  getAlumniDetail: (alumniId) => api.get(`/alumni/directory/${alumniId}/`),
  // Events
  getEvents: () => api.get("/alumni/events/"),
  // Jobs
  getJobs: (params) => api.get("/alumni/jobs/", { params }),
  getJobDetail: (jobId) => api.get(`/alumni/jobs/${jobId}/`),
  postJob: (data) => api.post("/alumni/jobs/", data),
  updateJob: (jobId, data) => api.put(`/alumni/jobs/${jobId}/`, data),
  deleteJob: (jobId) => api.delete(`/alumni/jobs/${jobId}/`),
  // Mentorship
  getMentors: () => api.get("/alumni/mentors/"),
  getMentorshipRequests: () => api.get("/alumni/mentorship/requests/"),
  requestMentorship: (data) => api.post("/alumni/mentorship/requests/", data),
  updateMentorshipRequest: (requestId, data) => api.put(`/alumni/mentorship/requests/${requestId}/`, data),
  // Announcements
  getAnnouncements: () => api.get("/alumni/announcements/")
};
export const authApi = {
  login: (username, password) => api.post("/auth/login/", { email: username, password }),
  forgotPassword: (data) => api.post("/auth/forgot-password/", data),
  logout: (refreshToken) => api.post("/auth/logout/", { refresh: refreshToken }),
  refreshToken: (refreshToken) => api.post("/auth/token/refresh/", { refresh: refreshToken }),
  changePassword: (data) => api.post("/auth/change-password/", data)
};
