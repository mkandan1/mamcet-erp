import { Icon } from "@iconify/react/dist/iconify.js";
import { Toast } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../redux/actions/toastActions";

export const ToastMessage = () => {
  const dispatch = useDispatch();
  const { show, type, text } = useSelector((state) => state.toast);

  useEffect(() => {
    setTimeout(() => {
      dispatch(hideToast());
    }, 4000);
  }, [show]);

  if (!show) {
    return;
  }
  return (
    <div className="absolute right-10 bottom-24 z-20">
      <Toast>
        <Icon
          icon={type == "success" ? "lets-icons:check-fill" : "carbon:close-filled"}
          className={`rounded-full p-1 ${
            type == "success"
              ? "text-green-500 bg-green-200"
              : "text-red-500 bg-red-200"
          } text-2xl`}
        />
        <div className="pl-4 text-sm font-normal">{text}</div>
      </Toast>
    </div>
  );
};
