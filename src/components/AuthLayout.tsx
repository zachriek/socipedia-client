import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const theme = useTheme<any>();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  return (
    <Box>
      <Box width="100%" sx={{ backgroundColor: theme.palette.background.alt, textAlign: 'center' }} p="1rem 6%">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Socipedia
        </Typography>
      </Box>
      <Box width={isNonMobileScreens ? '50%' : '93%'} p="2rem" m="2rem auto" borderRadius="1.5rem" sx={{ backgroundColor: theme.palette.background.alt }}>
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
