import { Gradient } from "@/Contants/constant";
import React, { useState } from "react";
import Ripples from "react-ripples";
import Modal from "@/component/Modal/Modal";
export default function CustomRipple({
  text,
  className,
  style,
  onClick,
  isloading,
  onSelectedRaiseQuote,
}) {
  return (
    // <Ripples className={`bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white px-4 py-2 font-normal group-hover:font-medium tracking-wider rounded-md mm:text-xs ${className} group-hover:from-white group-hover:to-white group-hover:text-headupb2b`} onClick={() => { onClick ? onClick() : {} }} >
    //     <label className='cursor-pointer'> {text} </label>
    // </Ripples>
    <Ripples
      className={`px-4 py-2 font-normal tracking-wider rounded-md mm:text-xs ${className} ${
        onSelectedRaiseQuote
          ? "bg-white text-black"
          : "bg-gradient-to-b from-[#402A6F] to-[#5E3F99] text-white group-hover:font-medium group-hover:text-headupb2b group-hover:from-white group-hover:to-white"
      }`}
      style={{
        backgroundColor: onSelectedRaiseQuote ? "white" : "transparent",
      }}
      onClick={() => {
        onClick ? onClick() : {};
      }}
    >
      <label className="cursor-pointer"> {text} </label>
    </Ripples>
  );
}
