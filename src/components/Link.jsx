import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export const LinkTag = ({ href, text, target }) => {
  return (
    <Link
      to={href}
      className="label-text font-normal text-blue-500"
      target={target ? target : "_self"}
    >
      {text}
    </Link>
  );
};
