import { Icon } from "@iconify/react/dist/iconify.js";

export const Button = ({ text, onClick }) => {
  return (
    <button className="btn btn-primary w-full" onClick={onClick}>
      {text}
    </button>
  );
};

export const IconButton = ({ text, bgColor, textColor, icon, onClick }) => {
  return (
    <button className={`flex items-center gap-1 py-2 px-3 bg-${bgColor} hover:bg-base-content transition-all duration-150 text-${textColor}`} onClick={onClick}>
      <Icon icon={icon} className="text-md"/>
      <span className="text-[13px] font-normal">{text}</span>
    </button>
  );
};
