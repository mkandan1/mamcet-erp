import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

export const TopNavBar = () => {
  return (
    <div className="navbar fixed bg-blue-800">
      <div className="navbar-start">
        <a className="text-white text-base lx:text-lg">MAMCET</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Icon icon={"ic:baseline-search"} className="text-white text-xl" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Icon
              icon={"mingcute:notification-fill"}
              className="text-white text-xl"
            />
            <span className="badge badge-xs badge-warning indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">
          <Link to={"/Profile"}>
            <Avatar/>
          </Link> 
        </button>
      </div>
    </div>
  );
};
