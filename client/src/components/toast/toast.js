import { toast } from "react-toastify";

const timer = 1000;

export default function toastFun(message, type){
    if (type === 1) {
      toast.success(message, {
        position: "top-center",
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === 2) {
      toast.error(message, {
        position: "top-center",
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  