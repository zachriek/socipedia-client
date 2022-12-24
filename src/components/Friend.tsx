import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import useFriend from '../hooks/useFriend';

interface Props {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

const Friend = ({ friendId, name, subtitle, userPicturePath }: Props) => {
  const { patchFriend } = useFriend();
  const navigate = useNavigate();
  const { _id } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.token);
  const friends = useSelector((state: any) => state.user.friends);

  const { palette } = useTheme<any>();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend: any) => friend._id === friendId);

  const handlePatchFriend = async () => {
    await patchFriend(_id, friendId, token);
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId ? (
        <IconButton onClick={() => handlePatchFriend()} sx={{ backgroundColor: primaryLight, p: '0.6rem' }}>
          {isFriend ? <PersonRemoveOutlined sx={{ color: primaryDark }} /> : <PersonAddOutlined sx={{ color: primaryDark }} />}
        </IconButton>
      ) : null}
    </FlexBetween>
  );
};

export default Friend;
