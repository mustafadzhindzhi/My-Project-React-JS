import { calculatePasswordStrength } from "./passwordUtil.js";

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
};

const isPasswordValid = (password) => {
  return calculatePasswordStrength(password) === 3;
};

export { isEmailValid, isPasswordValid };