import {
  BASE_URL,
  getAuthHeaders,
  getJsonHeaders,
  parseResponse,
} from '@/lib/clientApi';
import { guardarAccessToken } from '@/lib/authStorage';

const API_URL = `${BASE_URL}/auth`;

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  access_token: string;
  user?: AuthUser;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
};

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse<AuthResponse>(response, 'Error al registrar usuario');
}

export async function loginUser(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse<AuthResponse>(response, 'Error al iniciar sesión');
}
export async function getProfile(): Promise<Profile> {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  return parseResponse<Profile>(response, 'Error al obtener el perfil');
}