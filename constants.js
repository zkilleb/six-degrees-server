import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const host = process.env.SERVER_HOST || 'http://localhost';
export const port = process.env.SERVER_PORT || 8080;
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = process.env.API_KEY;

export const api = axios.create({
  baseURL: BASE_URL,
});
