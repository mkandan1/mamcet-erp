import { Icon } from "@iconify/react/dist/iconify.js";

export const IconInput = ({type, icon, placeholder, onChange}) => {
    return(
        <label class="input input-bordered flex items-center gap-2">
            <Icon icon={icon} className="w-4 h-4 opacity-70"
            />
            <input type={type} class="grow" placeholder={placeholder} onChange={onChange}/>
          </label>
    );
}