const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

export function guardarAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function obtenerAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function eliminarAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function guardarUsuario<T>(usuario: T) {
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obtenerUsuario<T>() {
  if (typeof window === 'undefined') {
    return null;
  }

  const usuario = localStorage.getItem(USER_KEY);

  if (!usuario) {
    return null;
  }

  try {
    return JSON.parse(usuario) as T;
  } catch {
    return null;
  }
}

export function eliminarUsuario() {
  localStorage.removeItem(USER_KEY);
}

export function limpiarSesion() {
  eliminarAccessToken();
  eliminarUsuario();
}