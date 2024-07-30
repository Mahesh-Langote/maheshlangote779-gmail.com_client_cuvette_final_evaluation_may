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
  apiFormsDelete: (id) => `${API_BASE_URL}/api/forms/${id}`,
  apiForms: `${API_BASE_URL}/api/forms`,
  apiFormsById: (id) => `${API_BASE_URL}/api/forms/${id}`,
  apiSubmissions: `${API_BASE_URL}/api/submissions`,
  apiGenerateUniqueId: (formId) => `${API_BASE_URL}/api/submissions/generate-unique-id/${formId}`,
  apiFormsPublic: (formId) => `${API_BASE_URL}/api/forms/public/${formId}`,
  apiFormsShare: (id) => `${API_BASE_URL}/api/forms/${id}/share`,
  apiSubmissionsFormSubmissions: (formId) => `${API_BASE_URL}/api/submissions/form-submissions/${formId}`,


};

export default API_ENDPOINTS;