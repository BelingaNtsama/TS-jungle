// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://expressj-ts-jungle-deploy.vercel.app',
  withCredentials: true,
});

// Intercepteur pour gérer les erreurs globales
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      localStorage.removeItem('user'); // Optionnel : nettoyer les données de l'utilisateur
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;