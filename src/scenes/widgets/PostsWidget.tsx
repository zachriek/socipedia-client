import { CircularProgress } from '@mui/material';
import PostWidget from './PostWidget';
import useAllPosts from '../../hooks/useAllPosts';

const PostsWidget = () => {
  const { allPosts, isLoading } = useAllPosts();

  return (
    <>
      {!isLoading ? (
        allPosts.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }: any) => (
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

export default PostsWidget;
