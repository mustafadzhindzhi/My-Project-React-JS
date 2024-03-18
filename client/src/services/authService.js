import * as request from '../lib/request.js';

const baseUrl = 'http://localhost:3001';

export const register = async (email, username, password) => {
  const result = await request.post(`${baseUrl}/register`, {
    email,
    username,
    password,
  });

  return result;
};

export const validateToken = async () => {
    const token = localStorage.getItem('token');
  
    console.log('Token from localStorage:', token);
  
    if (!token) {
      return { valid: false, message: 'Token not found' };
    }
  
    try {
      const result = await request.post(`${baseUrl}/validateToken`, null, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
  
      return result;
    } catch (error) {
      return { valid: false, message: 'Error validating token' };
    }
  };
  
  
