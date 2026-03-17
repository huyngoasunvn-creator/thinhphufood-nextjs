"use client";

import { useEffect, useState } from "react";

export default function IntroWelcome() {

  const [hide,setHide] = useState(false);
  const [show,setShow] = useState(true);

  useEffect(()=>{

    const timer = setTimeout(()=>{
      setHide(true);
    },800);

    const remove = setTimeout(()=>{
      setShow(false);
    },1500);

    return ()=>{
      clearTimeout(timer);
      clearTimeout(remove);
    }

  },[]);

  if(!show) return null;

  return(
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
      bg-gradient-to-b from-white to-green-50
      transition-opacity duration-700
      ${hide ? "opacity-0" : "opacity-100"}`}
    >

      <img
        src="/logo.png"
        alt="Thịnh Phú Food"
        className="w-16 sm:w-20 md:w-24 mb-4 animate-intro"
      />

      <h1 className="text-green-700 text-center font-semibold animate-intro">

        <span className="block text-xl sm:text-3xl md:text-4xl">
          ThinhPhuFood
        </span>

        <span className="block text-lg sm:text-2xl md:text-3xl mt-1">
          Kính Chào Quý Khách!
        </span>

      </h1>

    </div>
  );
}