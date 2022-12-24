import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import useLogin from '../../hooks/useLogin';
import AuthLayout from '../../components/AuthLayout';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Field is Required'),
  password: yup.string().required('Field is Required'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { login } = useLogin();
  const { palette } = useTheme<any>();
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    await login(values, onSubmitProps);
  };

  return (
    <AuthLayout>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValuesLogin} validationSchema={loginSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1r))" sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}>
              <TextField
                label="Email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>

            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: '2rem 0',
                  p: '1rem',
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  '&:hover': { color: palette.primary.main },
                }}
              >
                LOGIN
              </Button>
              <Link to="/register">
                <Typography
                  sx={{
                    textDecoration: 'underline',
                    color: palette.primary.main,
                    '&:hover': {
                      cursor: 'pointer',
                      color: palette.primary.light,
                    },
                  }}
                >
                  Don't have an account? Sign up here.
                </Typography>
              </Link>
            </Box>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default LoginPage;
