import React from "react";
import { TopNavBar } from "./TopNavBar";
import { Drawer } from "./Drawer";

export const Container = ({ children }) => {
  return (
    <div className="relative">
      <TopNavBar />

      <div className="relative">
        <div className="hidden md:block">
          <Drawer />
        </div>
      </div>
      <div className="md:ml-64 pt-20 px-2 py-2">{children}</div>
    </div>
  );
};
