import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../state';
import { baseApiUrl } from '../utils/fetchApi';
import SweetAlert from '../utils/SweetAlert';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values: any, onSubmitProps: any) => {
    const response = await fetch(`${baseApiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      return SweetAlert({ icon: 'error', title: 'Oops...', text: data.message });
    }
    onSubmitProps.resetForm();
    if (data) {
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      navigate('/');
      SweetAlert({ icon: 'success', title: 'Good job!', text: data.message });
    }
  };

  return { login };
};

export default useLogin;
