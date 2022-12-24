import { Box, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import UserPostsWidget from '../widgets/UserPostsWidget';
import UserWidget from '../widgets/UserWidget';
import useUser from '../../hooks/useUser';

const ProfilePage = () => {
  const { userId } = useParams();
  const { _id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const { user, isLoading } = useUser(userId, token);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  return (
    <Box>
      <Navbar />
      {!isLoading ? (
        <Box width="100%" padding="2rem 6%" display={isNonMobileScreens ? 'flex' : 'block'} gap="2rem" justifyContent="center">
          <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId} />
          </Box>
          <Box flexBasis={isNonMobileScreens ? '42%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'}>
            {userId === _id ? (
              <>
                <MyPostWidget picturePath={user.picturePath} />
                <Box m="2rem 0" />
              </>
            ) : null}
            <UserPostsWidget userId={userId} />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default ProfilePage;
