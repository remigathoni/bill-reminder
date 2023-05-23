"use client"
import { useRouter } from 'next/navigation';
import { useState } from "react";

import { formatCurrency, markAsPaid, markAsUnpaid } from "@/utils/bill";
import { reminders, toTitleCase } from "@/utils/helper";
import Button from '../Button';

export default  function ViewBill({bill}:{bill: { [x: string]: any; }[]}) {
  const router = useRouter();
    const [isPaid, setisPaid] = useState(bill[0].paid)
    const formattedPrice = formatCurrency(Number(bill[0].price))
    const getName = (value: number , data: { name: string; value: number; }[]) => {
        for(let i in data) {
            if(data[i].value = value) {
                return data[i].name
            }
        }
    }
    const payBill = async () => {
        if(!isPaid) {
            await markAsPaid(bill[0].id )
            setisPaid(true)
        } 
        router.push("/bills/all")
    }
  const markUnpaid = async () => {
    if(isPaid) {
      await markAsUnpaid(bill[0].id)
    }
  }
    if(!bill) return <p>Bill not found</p>
  return (
    <div>
    <section className='w-full md:w-2/3 mx-auto mt-4 p-2 border rounded'>
          <div className=' flex justify-between mt-4'>
            <div className='font-medium '>Name</div>
            <div
              className=""
              >{toTitleCase(bill[0].name)}</div>
          </div>
          
          <div className=' flex justify-between mt-4'>
            <div className=' font-medium'>Category</div>
            <div className="">{toTitleCase(bill[0].category || "Not added")}</div>
          </div>

          <div className=' flex justify-between mt-4'>
            <div className='font-medium'>Price</div>
            <div
              className=""
              >{formattedPrice}</div>
          </div>

          <div className=' flex justify-between mt-4'>
            <div className=' font-medium'>Next Bill</div>
              <div
              className=""
              >{String(bill[0].nextdue) || ""}</div>
          </div>


          <div className=' flex justify-between mt-4'>
            <div className='font-medium'>Remind me</div>
            <div
              className=" "
              >{getName(Number(bill[0].reminder), reminders) || "Don't remind me"}</div>
          </div>
        </section>
        <section className="flex flex-wrap justify-center w-1/3 mx-auto mt-4">
        {isPaid?
        
        <Button
        text='Mark as UnPaid'
        backGroundColor='bg-yellow-950'
        handler={markUnpaid} 
    />: <Button
        text='Mark as Paid'
        backGroundColor='bg-yellow-950'
        handler={payBill} 
    />
        
}
        </section>
    </div>
  )
}
