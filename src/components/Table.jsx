import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export const SelectionTable = ({ headers, data, onSelect, rowId }) => {
  return (
    <div className="overflow-x-auto row-span-12 col-span-12">
      <table className="table table-sm">
        <thead>
          <tr>
            <th></th>
            {headers.map((header, index) => (
              <th key={index}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`hover:bg-base-200 cursor-pointer ${row._id == rowId ? 'bg-blue-300' : 'bg-white'}`}>
                <td>{rowIndex + 1}</td>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} onClick={()=> onSelect(row._id)}>{row[header.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td colSpan={headers.length + 1} className="">
                <div className="w-full flex justify-center items-center">
                  <div className="flex gap-2 items-center">
                    <Icon icon={"fluent:box-dismiss-24-filled"} className="text-lg"></Icon>
                    No data available
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
