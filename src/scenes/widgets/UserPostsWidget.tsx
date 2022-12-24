import { CircularProgress } from '@mui/material';
import PostWidget from './PostWidget';
import useUserPosts from '../../hooks/useUserPosts';
import { useSelector } from 'react-redux';

const UserPostsWidget = ({ userId }: any) => {
  const token = useSelector((state: any) => state.token);
  const { userPosts, isLoading } = useUserPosts(userId, token);

  return (
    <>
      {!isLoading ? (
        userPosts.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }: any) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default UserPostsWidget;
