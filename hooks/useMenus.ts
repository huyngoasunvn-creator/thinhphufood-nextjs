"use client";

import { useEffect, useState } from "react";

export default function useMenus() {

  const [menus,setMenus] = useState<any[]>([]);

  useEffect(()=>{

    const loadMenus = async () => {

      const res = await fetch("/api/menus")
      const data = await res.json()

      setMenus(data)

    }

    loadMenus()

  },[])

  return menus
}