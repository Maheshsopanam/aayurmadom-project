import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getProducts = () => axios.get(`${BASE_URL}/products`);
export const addProduct = product => axios.post(`${BASE_URL}/products`, product);
export const updateProduct = (id, product) => axios.put(`${BASE_URL}/products/${id}`, product);
export const deleteProduct = id => axios.delete(`${BASE_URL}/products/${id}`);

export const getOrders = () => axios.get(`${BASE_URL}/orders`);

export const getConsultations = () => axios.get(`${BASE_URL}/consultations`);

export const updateConsultationStatus = (id, status) =>
  axios.put(`${BASE_URL}/consultations/${id}/status?status=${status}`);
export const uploadImage = file => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${BASE_URL}/files/upload`, formData);
};
export const updateOrderStatus = (id, status) =>
  axios.put(`${BASE_URL}/orders/${id}/status?status=${status}`);