import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export const Breadcamps = ({ paths }) => {
  return (
    <div className="text-sm breadcrumbs col-span-12 col-start-1 h-10">
      <ul>
        <Icon icon={'ic:round-home'} className='text-lg mr-2'/>
        {Object.keys(paths).map((title) => (
          <li key={title}>
            <a href={paths[title]}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
