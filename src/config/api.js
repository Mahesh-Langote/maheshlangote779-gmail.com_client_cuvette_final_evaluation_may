// config/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ENDPOINTS = {
  apiAuthRegisterPost: `${API_BASE_URL}/api/auth/register`,
  apiAuthLoginPost: `${API_BASE_URL}/api/auth/login`,
  apiUserInfoGet: `${API_BASE_URL}/api/user/user-info`,
  apiFoldersGet: `${API_BASE_URL}/api/folders`,
  apiFoldersPost: `${API_BASE_URL}/api/folders`,  
  apiFoldersDelete: (id) => `${API_BASE_URL}/api/folders/${id}`,
  apiFormsFolder: `${API_BASE_URL}/api/forms/folder`,
  apiFormsGet: (id) => `${API_BASE_URL}/api/forms/${id}`,

};

console.log('API_BASE_URL:', API_BASE_URL);

export default API_ENDPOINTS;