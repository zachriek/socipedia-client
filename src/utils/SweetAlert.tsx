import Swal from 'sweetalert2';

interface Props {
  icon: any;
  title: any;
  text: any;
}

const SweetAlert = ({ icon, title, text }: Props) => {
  return Swal.fire({
    icon,
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

export default SweetAlert;
