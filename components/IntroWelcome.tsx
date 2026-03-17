"use client";

import { useEffect, useState } from "react";

export default function IntroWelcome() {

  const [hide,setHide] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setHide(true);
    },1200);

    return ()=> clearTimeout(timer);
  },[]);

  return(
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
      bg-gradient-to-b from-white to-green-50
      transition-opacity duration-700
      ${hide ? "opacity-0" : "opacity-100"}`}
    >

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Thịnh Phú Food"
        className="w-16 sm:w-20 md:w-24 mb-4 animate-intro"
      />

      {/* TEXT */}
      <h1
  className="
  px-6
  text-center
  max-w-md
  text-xl
  sm:text-3xl
  md:text-4xl
  font-semibold
  text-green-700
  leading-relaxed
  animate-intro
  "
>

  <span className="block">
    ThinhPhuFood
  </span>

  <span className="block">
    Kính Chào Quý Khách!
  </span>

</h1>

    </div>
  );
}