import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
})

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const authService = {
  register: (firstName, lastName, email, password) =>
    api.post('/auth/register', { firstName, lastName, email, password }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  verifyEmail: (token) =>
    api.post('/auth/verify-email', { token }),
  
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, newPassword) =>
    api.post('/auth/reset-password', { token, newPassword }),
}

export const fileService = {
  getFiles: (folderId) => {
    if (folderId) {
      return api.get(`/files?folderId=${folderId}`)
    }
    return api.get('/files')
  },
  
  searchFiles: (query) => api.get(`/files/search?query=${encodeURIComponent(query)}`),
  
  uploadFile: (formData) =>
    api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  deleteFile: (fileId) =>
    api.delete(`/files/${fileId}`),
  
  downloadFile: (fileId) =>
    api.get(`/files/download/${fileId}`, { responseType: 'blob' }),
  
  createFolder: (folderName, parentId) => {
    const payload = { folderName }
    if (parentId) {
      payload.parentId = parentId
    }
    return api.post('/files/create-folder', payload)
  },
  
  renameFile: (fileId, newName) =>
    api.put(`/files/${fileId}`, { name: newName }),
  
  getFolderPath: (folderId) =>
    api.get(`/files/path/${folderId}`),
}

export default api
