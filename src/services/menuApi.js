import axios from 'axios';
import { APP_CONFIG } from '../config/appConfig';

const apiClient = axios.create({
  baseURL: APP_CONFIG.API_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

function normalizeMenuResponse(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid menu response');
  }

  if (payload.data && typeof payload.data === 'object') {
    return payload.data;
  }

  return payload;
}

export async function fetchMenu() {
  const { data } = await apiClient.get('/api/menu');
  return normalizeMenuResponse(data);
}
