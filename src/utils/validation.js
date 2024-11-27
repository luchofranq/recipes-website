// src/utils/validation.js

// Validación del correo electrónico
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Correo electrónico debe tener un formato válido y dominio de al menos 2 caracteres
  return regex.test(email);
};

// Validación de la contraseña
export const validatePassword = (password) => {
  // Al menos 8 caracteres, 1 letra mayúscula, 1 número, y 1 carácter especial
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return regex.test(password);
};

// Validación de confirmación de la contraseña
export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Función para validación del correo con mensaje personalizado
export const getEmailErrorMessage = (email) => {
  if (!email) return "El correo electrónico es obligatorio.";
  if (!validateEmail(email)) return "Por favor, ingresa un correo electrónico válido.";
  return "";
};

// Función para validación de la contraseña con mensaje personalizado
export const getPasswordErrorMessage = (password) => {
  if (!password) return "La contraseña es obligatoria.";
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
  if (!/(?=.*[A-Z])/.test(password)) return "La contraseña debe tener al menos una letra mayúscula.";
  if (!/(?=.*\d)/.test(password)) return "La contraseña debe tener al menos un número.";
  if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) return "La contraseña debe contener al menos un carácter especial.";
  return "";
};

// Validación de confirmación de contraseña
export const getConfirmPasswordErrorMessage = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Las contraseñas no coinciden.";
  return "";
};
// src/utils/validation.js
export const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/\d/.test(password)) score += 25;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 25;
  return score;
};
