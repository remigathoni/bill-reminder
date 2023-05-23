"use client"
import { getDueDays } from "@/utils/bill"
import Link from "next/link"
import { useState } from "react"

const colors = {subscriptions:"bg-violet-100", home:"bg-amber-100", housing:"bg-amber-100", education:"bg-purple-100", utilities:"bg-red-100", insurance:"bg-fuchsia-100", health:"bg-fuchsia-100", investment:"bg-fuchsia-100", debt:"bg-fuchsia-100"}

interface iBill {
    id:string,
    title: string,
    price: string,
    category: string,
    paid: boolean,
    date: string
} 
export default function BillRow({id, title, date, price, category, paid}:iBill) {
    const dueData = getDueDays(date)
    const [isVisible, setisVisible] = useState(false)
    const handleMouseOver = (e:any) => {
      setisVisible(true)
    }
    const handleMouseLeave = (e:any) => {
      setisVisible(false)
    }
  return (
    <Link href={`/bills/view/?id=${id}`} className={`flex flex-row justify-between p-2 bg-transparent transition-colors hover:bg-gray-100 border-b border-t w-full  `} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <div className="">
            <h1 className=" leading-none mb-2 font-medium">{title}</h1>
            <div className="  ">Ksh. {price}</div>
        </div>
        <div className={` p-2  text-left  leading-none`}>{`${paid?"Paid": dueData.due}`}</div>
        
        <div className={ `flex items-center justify-center p-2 text-sm w-24 text-center rounded ${paid?"bg-green-500 text-white ":dueData.overdue?"bg-amber-600 text-white":"bg-slate-200 text-gray-700"}`}>
                {paid?"paid ":dueData.overdue?"overdue":"unpaid"}
        </div>
        

    </Link>
  )
}