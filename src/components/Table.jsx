import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export const SelectionTable = ({ headers, data = [] }) => {
  return (
    <div className="overflow-x-auto">
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
              <tr key={rowIndex}>
                <td>
                  <input type="checkbox" />
                </td>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
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
