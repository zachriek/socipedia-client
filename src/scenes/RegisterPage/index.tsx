import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import * as yup from 'yup';
import AuthLayout from '../../components/AuthLayout';
import useRegister from '../../hooks/useRegister';
import FlexBetween from '../../components/FlexBetween';
import { EditOutlined } from '@mui/icons-material';

interface InitialValuesInterface {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: any;
}

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Field is Required'),
  lastName: yup.string().required('Field is Required'),
  username: yup.string().required('Field is Required'),
  email: yup.string().email('invalid email').required('Field is Required'),
  password: yup.string().required('Field is Required'),
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string(),
});

const initialValuesRegister: InitialValuesInterface = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
};

const RegisterPage = () => {
  const { register } = useRegister();
  const { palette } = useTheme<any>();
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    await register(values, onSubmitProps);
  };

  return (
    <AuthLayout>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValuesRegister} validationSchema={registerSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1r))" sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}>
              <TextField
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: 'span 4' }}
              />
              <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
                <Dropzone accept={{ 'image/jpeg': ['.jpg', '.jpeg', '.png'] }} multiple={false} onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}>
                  {({ getRootProps, getInputProps }) => (
                    <Box {...getRootProps()} border={`2px dashed ${palette.primary.main}`} p="1rem" sx={{ '&:hover': { cursor: 'pointer' } }}>
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.picture.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
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
                REGISTER
              </Button>
              <Link to="/login">
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
                  Already have an account? Login here.
                </Typography>
              </Link>
            </Box>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default RegisterPage;
