import React from 'react';

export const Breadcamps = ({ paths }) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {Object.keys(paths).map((title) => (
          <li key={title}>
            <a href={paths[title]}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
