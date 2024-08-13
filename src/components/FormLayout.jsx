import React from 'react'
export const FormLayout = ({ children }) => {
  return (
    <div className="relative rounded-md px-2 py-20 shadow-md h-full w-full overflow-x-hidden flex justify-center bg-white col-span-12 pb-20">
      <div className='w-1/2'>
        {children}
      </div>
    </div>
  );
};
