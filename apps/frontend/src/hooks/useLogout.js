import { useAuthContext } from './useAuthContext';
import { logout as logoutService } from '../services/authServices';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error('Logout error:', err);
    }

    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
