'use client';

import { useEffect, useState } from "react";
import { db } from "@/services/firebase";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

export default function AdminMenus(){

  const [menus,setMenus] = useState<any[]>([])

  const [name,setName] = useState("")
  const [parentId,setParentId] = useState("")
  const [order,setOrder] = useState(0)

  const [editingId,setEditingId] = useState("")

  // tạo slug tự động
  const slugify = (text:string)=>{
    return "/" + text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/\s+/g,"-")
  }

  // load menu
  const loadMenus = async ()=>{

    const q = query(
      collection(db,"menus"),
      orderBy("order","asc")
    )

    const snap = await getDocs(q)

    const data = snap.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }))

    setMenus(data)

  }

  useEffect(()=>{
    loadMenus()
  },[])

  // thêm menu
  const handleAdd = async ()=>{

    if(!name){
      alert("Nhập tên menu")
      return
    }

    const slug = slugify(name)

    await addDoc(collection(db,"menus"),{
      name,
      slug,
      parentId: parentId || null,
      order,
      isActive:true,
      createdAt:new Date()
    })

    setName("")
    setOrder(0)
    setParentId("")

    loadMenus()

  }

  // xóa menu
  const handleDelete = async(id:string)=>{

    if(!confirm("Xóa menu?")) return

    await deleteDoc(doc(db,"menus",id))

    loadMenus()

  }

  // bật tắt menu
  const toggleActive = async(menu:any)=>{

    await updateDoc(doc(db,"menus",menu.id),{
      isActive:!menu.isActive
    })

    loadMenus()

  }

  // sửa menu
  const handleEdit = (menu:any)=>{

    setEditingId(menu.id)

    setName(menu.name)
    setParentId(menu.parentId || "")
    setOrder(menu.order)

  }

  const handleUpdate = async()=>{

    const slug = slugify(name)

    await updateDoc(doc(db,"menus",editingId),{
      name,
      slug,
      parentId: parentId || null,
      order
    })

    setEditingId("")
    setName("")
    setOrder(0)
    setParentId("")

    loadMenus()

  }

  // tách menu cha
  const parents = menus.filter(m=>!m.parentId)

  const getChildren = (id:string)=>{
    return menus.filter(m=>m.parentId===id)
  }

  return(

<div className="p-6">

<h1 className="text-xl font-bold mb-6">
Quản lý Menu Website
</h1>

{/* FORM */}

<div className="border p-4 rounded mb-6 space-y-3">

<input
className="border p-2 w-full"
placeholder="Tên menu"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
className="border p-2 w-full"
value={parentId}
onChange={(e)=>setParentId(e.target.value)}
>

<option value="">Menu cha</option>

{menus.map(menu=>(
<option key={menu.id} value={menu.id}>
{menu.parentId ? "— " : ""}{menu.name}
</option>
))}

</select>

<input
type="number"
className="border p-2 w-full"
placeholder="Thứ tự"
value={order}
onChange={(e)=>setOrder(Number(e.target.value))}
/>

{editingId ? (

<button
onClick={handleUpdate}
className="bg-orange-500 text-white px-4 py-2 rounded"
>
Cập nhật menu
</button>

) : (

<button
onClick={handleAdd}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Thêm menu
</button>

)}

</div>


{/* LIST MENU */}

<div className="space-y-3">

{parents.map(parent=>(

<div
key={parent.id}
className="border p-4 rounded"
>

<div className="flex justify-between items-center">

<div>

<b>{parent.order}</b> - {parent.name}

<div className="text-sm text-gray-500">
{parent.slug}
</div>

</div>

<div className="flex gap-2">

<button
onClick={()=>toggleActive(parent)}
className={`px-3 py-1 rounded text-white ${
parent.isActive ? "bg-green-600" : "bg-gray-400"
}`}
>
{parent.isActive ? "Hiện" : "Ẩn"}
</button>

<button
onClick={()=>handleEdit(parent)}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Sửa
</button>

<button
onClick={()=>handleDelete(parent.id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Xóa
</button>

</div>

</div>


{/* MENU CON */}

{getChildren(parent.id).map(child=>(

<div
key={child.id}
className="ml-6 mt-3 border-l pl-4 flex justify-between items-center"
>

<div>

↳ {child.name}

<div className="text-sm text-gray-500">
{child.slug}
</div>

</div>

<div className="flex gap-2">

<button
onClick={()=>toggleActive(child)}
className={`px-3 py-1 rounded text-white ${
child.isActive ? "bg-green-600" : "bg-gray-400"
}`}
>
{child.isActive ? "Hiện" : "Ẩn"}
</button>

<button
onClick={()=>handleEdit(child)}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Sửa
</button>

<button
onClick={()=>handleDelete(child.id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Xóa
</button>

</div>

</div>

))}

</div>

))}

</div>

</div>

)

}