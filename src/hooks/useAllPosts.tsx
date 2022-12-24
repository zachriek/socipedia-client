import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state';
import { baseApiUrl } from '../utils/fetchApi';

const useAllPosts = () => {
  const dispatch = useDispatch();

  const allPosts = useSelector((state: any) => state.posts);
  const token = useSelector((state: any) => state.token);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllPosts = async () => {
    setIsLoading(true);
    const response = await fetch(`${baseApiUrl}/posts`, {
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
    getAllPosts();
  }, []);

  return { allPosts, isLoading };
};

export default useAllPosts;
