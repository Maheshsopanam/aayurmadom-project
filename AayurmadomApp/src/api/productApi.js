import axios from 'axios';

const API_URL = 'http://192.168.30.103:8080/api/products';

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};