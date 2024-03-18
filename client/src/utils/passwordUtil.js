export const calculatePasswordStrength = (password) => {
    const minLength = 8;
    const minUppercase = 1;
    const minLowercase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;
  
    const uppercaseRegex = /[A-Z]/g;
    const lowercaseRegex = /[a-z]/g;
    const numbersRegex = /[0-9]/g;
    const specialCharsRegex = /[^A-Za-z0-9]/g;
  
    const hasMinLength = password.length >= minLength;
    const hasMinUppercase = (password.match(uppercaseRegex) || []).length >= minUppercase;
    const hasMinLowercase = (password.match(lowercaseRegex) || []).length >= minLowercase;
    const hasMinNumbers = (password.match(numbersRegex) || []).length >= minNumbers;
    const hasMinSpecialChars = (password.match(specialCharsRegex) || []).length >= minSpecialChars;
  
    if (hasMinLength && hasMinUppercase && hasMinLowercase && hasMinNumbers && hasMinSpecialChars) {
      return 3; 
    } else if (hasMinLength && (hasMinUppercase || hasMinLowercase || hasMinNumbers || hasMinSpecialChars)) {
      return 2; 
    } else {
      return 1; 
    }
  };

  export const getPasswordStrengthColor = (password) => {
    const strength = calculatePasswordStrength(password);
  
    if (strength >= 3) {
      return "strong";
    } else if (strength === 2) {
      return "medium";
    } else if (strength === 1) {
      return "weak";
    }
  };