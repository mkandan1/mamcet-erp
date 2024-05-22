import React from 'react'
export const FormLayout = ({ children }) => {
    return (
      <div className="relative px-2 py-2 max-h-screen w-max-screen overflow-auto col-span-12 h-[70vh]">
        <div className="grid grid-cols-12 grid-rows-auto">
          <div className="col-span-12 flex flex-col grid-cols-12 grid-rows-auto gap-4">
            {children}
          </div>
        </div>
      </div>
    );
  };
