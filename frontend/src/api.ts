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


export async function fetchFamilyMembers(token: string) {
  const res = await fetch(`${API_URL}/family`, {
    headers: authHeader(token)
  });
  return res.json();
}

export async function createFamily(token, name) {
  const res = await axios.post(`${API_URL}/family/create`, name, { headers: authHeader(token) });
  return res.data;
}


export async function createJoinRequest(token: string, userId: number, familyId: number) {
  const res = await axios.post(`${API_URL}/request`, { userId, familyId: Number(familyId) }, { headers: authHeader(token) });
  return res.data;
}

export async function fetchTasks(token) {
  const res = await axios.get(`${API_URL}/tasks`, { headers: authHeader(token) });
  return res.data;
}

export async function createTask(token, task) {
  const res = await axios.post(`${API_URL}/tasks`, task, { headers: authHeader(token) });
  return res.data;
}

export async function updateTask(token, id, data) {
  const res = await axios.put(`${API_URL}/tasks/${id}`, data, { headers: authHeader(token) });
  return res.data;
}

export async function deleteTask(token, id) {
  const res = await axios.delete(`${API_URL}/tasks/${id}`, { headers: authHeader(token) });
  return res.data;
}

export async function fetchRequests(token) {
  const res = await fetch(`${API_URL}/request/pending`, {
    headers: authHeader(token)
  });
  return res.json();
}

export async function approveJoinRequest(token: string, requestId: number) {
  const res = await axios.post(`${API_URL}/request/${requestId}`, { action: 'APPROVE' }, { headers: authHeader(token) });
  return res.data;
}

export async function rejectJoinRequest(token: string, requestId: number) {
  const res = await axios.post(`${API_URL}/request/${requestId}`, { action: 'REJECT' }, { headers: authHeader(token) });
  return res.data;
}