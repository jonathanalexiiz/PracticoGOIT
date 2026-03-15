export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  titulo: string;
  textoBoton: string;
  textoBotonCargando: string;
  textoFooter: string;
  textoLink: string;
  hrefLink: string;
  redirectIfAuthenticated: string;
  redirectAfterSuccess: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFormProps = {
  titulo: string;
  textoBoton: string;
  textoBotonCargando: string;
  textoFooter: string;
  textoLink: string;
  hrefLink: string;
  redirectIfAuthenticated: string;
  redirectAfterSuccess: string;
};