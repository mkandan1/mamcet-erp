import { Icon } from "@iconify/react/dist/iconify.js";

export const IconInput = ({type, icon, placeholder, onChange}) => {
    return(
        <label className="input input-bordered flex items-center gap-2">
            <Icon icon={icon} className="w-4 h-4 opacity-70"/>
            <input type={type} className="grow input-ghost outline-none border-none rounded-lg " placeholder={placeholder} onChange={onChange}/>
          </label>
    );
}

