import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://localhost/api', // Replace with your Laravel API base URL
  withCredentials: true, // Important for including credentials in requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to add the token to requests
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Use AsyncStorage to get the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('Request headers:', config.headers); // Debugging

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
