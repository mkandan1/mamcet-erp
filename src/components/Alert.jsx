import { Icon } from "@iconify/react/dist/iconify.js";

export const FailedAlert = ({ text }) => {
  return (
    <div role="alert" className="flex bg-red-200 mx-10 p-2 items-center gap-x-2 text-red-600 border border-red-300 rounded-lg">
      <Icon icon={'carbon:close-filled'}/>
      <span>{text}</span>
    </div>
  );
};

export const SuccessAlert = ({ text }) => {
    return (
      <div role="alert" className="flex bg-green-200 mx-10 p-2 items-center gap-x-2 text-green-600 border border-green-300 rounded-lg">
        <Icon icon={'ep:success-filled'}/>
        <span>{text}</span>
      </div>
    );
  };
