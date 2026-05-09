// Validar que el teléfono tenga entre 6 y 10 dígitos
export const validateTelefono = (tel) => tel.length >= 6 && tel.length <= 10;

// Validar formato de correo electrónico
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validar que solo contenga letras (para nombres y títulos)
export const validateSoloLetras = (text) => {
  const re = /^[a-zA-ZÀ-ÿ\s]+$/;
  return re.test(text);
};

// Limpiar entrada para que solo permita números
export const formatSoloNumeros = (val) => val.replace(/\D/g, '').slice(0, 10);