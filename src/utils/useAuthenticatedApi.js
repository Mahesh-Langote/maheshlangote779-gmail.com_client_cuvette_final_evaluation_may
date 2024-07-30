
import { useAuth } from '../context/AuthContext';

const useAuthenticatedApi = () => {
  const { isLoggedIn } = useAuth();

  const authenticatedFetch = async (url, options = {}) => {
    if (!isLoggedIn) {
      throw new Error('User is not authenticated');
    }

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    console.log('Making authenticated request to:', url);
    console.log('Request options:', { ...options, headers });

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    return response.json();
  };

  return { authenticatedFetch };
};

export default useAuthenticatedApi;