import React from 'react'

export const InputLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-12">
      <div className="md:col-start-1 col-span-12 grid grid-cols-12 grid-rows-8 gap-4">
        {children}
      </div>
    </div>
  );
};