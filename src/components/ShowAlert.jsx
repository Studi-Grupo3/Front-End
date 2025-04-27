import Swal from 'sweetalert2';

export const showAlert = ({ title, text, icon }) => {
  return Swal.fire({
    title,
    text,
    icon,
    background: '#3970B7',
    color: 'white',
    confirmButtonColor: '#FECB0A',
    cancelButtonColor: '#d33',
    iconColor: icon === 'success' ? '#00ff88' : icon === 'error' ? '#ff0055' : '#FECB0A',
    position: 'top-end', 
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    toast: true, 
    customClass: {
      popup: 'custom-swal-popup', 
    },
  });
};
