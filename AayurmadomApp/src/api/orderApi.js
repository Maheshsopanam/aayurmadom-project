import axios from 'axios';

const API_URL = 'http://192.168.30.103:8080/api/orders';

export const placeOrderApi = async orderData => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

export const getOrdersByUser = async email => {
  const response = await axios.get(`${API_URL}/user/${email}`);
  return response.data;
};