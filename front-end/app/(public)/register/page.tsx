import RegisterForm from '@/components/forms/registerForm';

export default function RegisterPage() {
  return (
    <RegisterForm
      titulo="Crear cuenta"
      textoBoton="Registrarse"
      textoBotonCargando="Registrando..."
      textoFooter="¿Ya tienes cuenta?"
      textoLink="Inicia sesión aquí"
      hrefLink="/login"
      redirectIfAuthenticated="/dashboard"
      redirectAfterSuccess="/login"
    />
  );
}