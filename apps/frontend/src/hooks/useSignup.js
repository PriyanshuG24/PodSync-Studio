import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { signup as signupService } from '../services/authServices';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name,email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signupService({ name,email, password }); // call Axios service
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user)); // save token
      dispatch({ type: 'LOGIN', payload: data.user }); // update context
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
