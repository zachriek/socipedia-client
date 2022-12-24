import { setPost, setPosts } from '../state';
import { useDispatch } from 'react-redux';
import { baseApiUrl } from '../utils/fetchApi';
import SweetAlert from '../utils/SweetAlert';

const usePosts = () => {
  const dispatch = useDispatch();

  const createPost = async (id: string, description: string, image: any, token: string) => {
    const formData = new FormData();
    formData.append('userId', id);
    formData.append('description', description);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    const response = await fetch(`${baseApiUrl}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const { data, message } = await response.json();

    if (response.status !== 200) {
      return SweetAlert({ icon: 'error', title: 'Oops...', text: message });
    }

    dispatch(setPosts({ posts: data }));
    SweetAlert({ icon: 'success', title: 'Good job!', text: message });
  };

  const patchLike = async (postId: string, loggedInUserId: string, token: string) => {
    const response = await fetch(`${baseApiUrl}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const { data, message } = await response.json();

    if (response.status !== 200) {
      return SweetAlert({ icon: 'error', title: 'Oops...', text: message });
    }

    dispatch(setPost({ post: data }));
    SweetAlert({ icon: 'success', title: 'Good job!', text: message });
  };

  return { createPost, patchLike };
};

export default usePosts;
