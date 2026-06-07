import axios from 'axios';

const API_URL = 'http://192.168.30.103:8080/api/consultations';

export const bookConsultationApi = async consultationData => {
  const response = await axios.post(API_URL, consultationData);
  return response.data;
};

export const getConsultationsByUser = async email => {
  const response = await axios.get(`${API_URL}/user/${email}`);
  return response.data;
};