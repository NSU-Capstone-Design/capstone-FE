import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// access token 을 항상 전달 해주세요
export const authenticatedApi = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
