import { Box } from '@mui/material';
import { baseUrl } from '../utils/fetchApi';

interface Props {
  image: string;
  size?: string;
}

const UserImage = ({ image, size = '60px' }: Props) => {
  return (
    <Box width={size} height={size}>
      <img style={{ objectFit: 'cover', borderRadius: '50%' }} width={size} height={size} src={`${baseUrl}/assets/${image ? image : 'p1.jpeg'}`} alt="user" />
    </Box>
  );
};

export default UserImage;
