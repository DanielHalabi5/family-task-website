import axios from 'axios'
import type { apiAuthType } from './types';



const API_URL = import.meta.env.VITE_API_URL;

function authHeader(token: string | null) {
  return { Authorization: `Bearer ${token}` };
}

export async function signup({ email, password, name }: apiAuthType) {
  const res = await axios.post(`${API_URL}/auth/signup`, { email, password, name })
  return res.data;
}


export async function login({ email, password }: apiAuthType) {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password })
  return res.data
}

export async function createFamily(token, name) {
  const res = await axios.post(`${API_URL}/family/create`, name, { headers: authHeader(token) });
  return res.data;
}


export async function createJoinRequest(token: string, userId: number, familyId: number) {
  const res = await axios.post(`${API_URL}/request`, { userId, familyId: Number(familyId) }, { headers: authHeader(token) });
  return res.data;
}