import { obtenerAccessToken } from '@/lib/authStorage';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL no está definida');
}

export { BASE_URL };

type ApiErrorShape = {
  message?: string | string[];
};

function getErrorMessage(data: unknown, defaultMessage: string) {
  if (data && typeof data === 'object' && 'message' in data) {
    const message = (data as ApiErrorShape).message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string') {
      return message;
    }
  }

  return defaultMessage;
}

export function getJsonHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

export function getAuthHeaders() {
  const token =
    typeof window !== 'undefined' ? obtenerAccessToken() : null;

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function parseResponse<T>(
  response: Response,
  defaultMessage: string,
): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(getErrorMessage(data, defaultMessage));
  }

  return data as T;
}

export async function parseVoidResponse(
  response: Response,
  defaultMessage: string,
): Promise<void> {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const data = isJson ? await response.json() : null;

    throw new Error(getErrorMessage(data, defaultMessage));
  }
}