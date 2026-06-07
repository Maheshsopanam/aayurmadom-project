import axios from 'axios';

const API_URL = 'http://192.168.30.103:8080/api/auth';

export const registerUser = async userData => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async loginData => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};
export const updateUserProfile = async (id, userData) => {
  const response = await axios.put(`${API_URL}/user/${id}`, userData);
  return response.data;
};