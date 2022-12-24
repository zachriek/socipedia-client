import { useState, useEffect } from 'react';
import { baseApiUrl } from '../utils/fetchApi';

const useUser = (userId: any, token: string) => {
  const [user, setUser] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseApiUrl}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await response.json();
      setUser(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return { user, isLoading };
};

export default useUser;
