import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import usePosts from '../../hooks/usePosts';
import { baseUrl } from '../../utils/fetchApi';

interface Props {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: any;
  comments: any;
}

const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }: Props) => {
  const { patchLike } = usePosts();
  const [isComments, setIsComments] = useState<boolean>(false);

  const token = useSelector((state: any) => state.token);
  const loggedInUserId = useSelector((state: any) => state.user._id);

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme<any>();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handlePatchLike = async () => {
    await patchLike(postId, loggedInUserId, token);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath ? <img width="100%" height="auto" alt="post" style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }} src={`${baseUrl}/assets/${picturePath}`} /> : null}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handlePatchLike}>{isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}</IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments ? (
        <Box mt="0.5rem">
          {comments.map((comment: any, index: any) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>{comment}</Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      ) : null}
    </WidgetWrapper>
  );
};

export default PostWidget;
