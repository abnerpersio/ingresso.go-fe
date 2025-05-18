import axios from 'axios';
import { Env } from '../constants/env';

export const httpClient = axios.create({
  baseURL: Env.apiBaseUrl,
});
