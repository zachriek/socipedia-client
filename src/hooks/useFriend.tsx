import { useDispatch } from 'react-redux';
import { setFriends } from '../state';
import { baseApiUrl } from '../utils/fetchApi';
import SweetAlert from '../utils/SweetAlert';

const useFriend = () => {
  const dispatch = useDispatch();

  const patchFriend = async (id: string, friendId: string, token: string) => {
    const response = await fetch(`${baseApiUrl}/users/${id}/${friendId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const { data, message } = await response.json();
    if (response.status !== 200) {
      return SweetAlert({ icon: 'error', title: 'Oops...', text: message });
    }
    dispatch(setFriends({ friends: data }));
    SweetAlert({ icon: 'success', title: 'Good job!', text: message });
  };

  return { patchFriend };
};

export default useFriend;
