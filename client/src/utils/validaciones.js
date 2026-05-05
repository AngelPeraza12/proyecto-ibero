export const validateTelefono = (tel) => tel.length >= 6 && tel.length <= 10;

export const formatSoloNumeros = (val) => val.replace(/\D/g, '').slice(0, 10);

