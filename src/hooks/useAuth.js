import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('userRole');

    if (token && userId && role) {
      setUser({ token, userId, role });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  return { user, loading };
};
