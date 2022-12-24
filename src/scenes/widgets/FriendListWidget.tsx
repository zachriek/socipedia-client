import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import Friend from '../../components/Friend';
import WidgetWrapper from '../../components/WidgetWrapper';
import useFriends from '../../hooks/useFriends';

interface Props {
  userId: any;
}

const FriendListWidget = ({ userId }: Props) => {
  const { palette } = useTheme<any>();
  const token = useSelector((state: any) => state.token);
  const { friends, isLoading } = useFriends(userId, token);

  return (
    <WidgetWrapper>
      <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: '1.5rem' }}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {!isLoading ? (
          friends?.map((friend: any) => (
            <Friend key={friend._id} friendId={friend._id} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.occupation} userPicturePath={friend.picturePath} />
          ))
        ) : (
          <CircularProgress />
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
