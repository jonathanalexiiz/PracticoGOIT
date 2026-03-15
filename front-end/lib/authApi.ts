const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getErrorMessage = (message: unknown) => {
  if (Array.isArray(message)) {
    return message.join(', ');
  }

  if (typeof message === 'string') {
    return message;
  }

  return 'Ocurrió un error inesperado';
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(data.message));
    }

    return data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(data.message));
    }

    return data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(data.message));
    }

    return data;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};