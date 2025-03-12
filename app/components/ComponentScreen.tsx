// components/ComponentScreen.tsx
import React from "react";
import { Component } from "./Component";

export const ComponentScreen = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[497px] bg-[#1e1e1eb2] rounded-[5px] border-[0.5px] border-dashed border-white flex justify-between px-7.5 py-7.5">
        <Component
          hover={false}
          variant="one"
        />
        <Component
          hover={true}
          variant="one"
        />
      </div>
    </div>
  );
};