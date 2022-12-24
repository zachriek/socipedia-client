import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state';
import { baseApiUrl } from '../utils/fetchApi';

const useUserPosts = (userId: any, token: string) => {
  const dispatch = useDispatch();
  const userPosts = useSelector((state: any) => state.posts);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUserPosts = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseApiUrl}/posts/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await response.json();
    dispatch(setPosts({ posts: data }));
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  useEffect(() => {
    getUserPosts();
  }, [userId]);

  return { userPosts, isLoading };
};

export default useUserPosts;
