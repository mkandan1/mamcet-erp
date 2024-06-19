import { Icon } from "@iconify/react/dist/iconify.js";

export const Card = ({ title, value, icon, bgColor, onClick }) => {
  return (
    <div className={`${bgColor} text-white card w-52 rounded-md border border-base-300 shadow-sm col-span-2 row-span-2 h-24`}>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className={`bg-slate-200 bg-opacity-10 rounded-full p-2`}>
              <Icon icon={icon} className="text-md" />
            </div>
            <h2 className="text-md font-semibold text-slate-100 tracking-tighter">{title}</h2>
          </div>
          <Icon icon={'ph:dots-three-vertical-bold'} className={'cursor-pointer text-2xl transition-all duration-200 p-1 rounded-full hover:bg-slate-200 hover:bg-opacity-10'}/>
        </div>
        <p className="text-2xl font-bold pl-9">{value ? value : '--'}</p>
      </div>
    </div>
  );
};
