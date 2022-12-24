import { useNavigate } from 'react-router-dom';
import { baseApiUrl } from '../utils/fetchApi';
import SweetAlert from '../utils/SweetAlert';

const useRegister = () => {
  const navigate = useNavigate();

  const register = async (values: any, onSubmitProps: any) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (values.picture) {
      formData.append('picturePath', values.picture.name);
    }

    const response = await fetch(`${baseApiUrl}/auth/register`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (response.status !== 201) {
      return SweetAlert({ icon: 'error', title: 'Oops...', text: data.message });
    }
    onSubmitProps.resetForm();
    if (data) {
      navigate('/login');
      SweetAlert({ icon: 'success', title: 'Good job!', text: data.message });
    }
  };

  return { register };
};

export default useRegister;
