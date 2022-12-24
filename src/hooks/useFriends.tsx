import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../state';
import { baseApiUrl } from '../utils/fetchApi';

const useFriends = (userId: string, token: string) => {
  const dispatch = useDispatch();
  const friends = useSelector((state: any) => state.user.friends);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFriends = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseApiUrl}/users/${userId}/friends`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await response.json();
    dispatch(setFriends({ friends: data }));
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  useEffect(() => {
    getFriends();
  }, [userId]);

  return { friends, isLoading };
};

export default useFriends;
