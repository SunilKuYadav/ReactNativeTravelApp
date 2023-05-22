import axios from 'axios';
import {URL} from '../config';

const client = axios.create({
  baseURL: URL.BASE_URL || '',
  timeout: 60000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const _getFlight = async () => {
  return await client.get(URL.SEARCH_FLIGHT);
};
const _saveFlight = async () => {
  return await client.get(URL.SAVE_FLIGHT);
};
const _deleteFlight = async () => {
  return await client.get(URL.DELETE_FLIGHT);
};

export const FlightService = {
  _getFlight,
  _saveFlight,
  _deleteFlight,
};
