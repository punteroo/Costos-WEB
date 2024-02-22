import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const addOk = (value: string) => {
    MySwal.fire({
        position: "top",
        icon: "success",
        title: value,
        showConfirmButton: false,
        timer: 1500,
        toast:true
      });
};
