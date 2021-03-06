import { toast } from 'react-toastify';

export const toastyWarn = (text) => {
    return toast.warn(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}