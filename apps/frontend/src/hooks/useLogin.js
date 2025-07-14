import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { login as loginService } from '../services/authServices';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginService({ email, password }); // call authService
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user)); // store token
      dispatch({ type: 'LOGIN', payload: data.user }); // update context
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
