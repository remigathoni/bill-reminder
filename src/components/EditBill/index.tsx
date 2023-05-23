"use client"
import { useState } from 'react';

import { selectItem } from '@/lib/types/bill.types';
import { deleteBillById, updateBillById } from "@/utils/bill";
import { categories, getInitialValue, getToday, reminders } from "@/utils/helper";
import { useRouter } from 'next/navigation';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import FormSelectInput from '../Input/FormSelectInput';
import ActionNav from '../Navbar/ActionNav';
import Notification from '../Notification';

export default  function EditBill({bill}:{bill: { [x: string]: any; }[]}) {
  const router = useRouter()
let initialCategory = getInitialValue(bill[0].category, categories)
  let initialReminder = getInitialValue(bill[0].reminder, reminders)
  
    const [errors, setErrors] = useState({price: "",
        name: "",
        save: ""})
    
    const [name, setName] = useState(bill[0].name)
    const [price, setPrice] = useState(bill[0].price)
    const [category, setCategory] = useState<selectItem>(initialCategory)
    const [reminder, setReminder] = useState<selectItem>(initialReminder)
    const [nextdue, setNextdue] = useState<DateValueType>({
      startDate: bill[0].nextdue || "",
      endDate: bill[0].nextdue || ""
    });
    const [notification, setnotification] = useState<{type: string, message:string}>({
      type: "",
      message: ""
    });
    const [open, setopen] = useState<boolean>(false)
    

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const name  = target.value
                setName(name)
        let updatedErrs = errors
        if(!name) {
          
          updatedErrs.name = "Please provide a name for your bill."
        } else {
          updatedErrs.name = ""
        }
        setErrors(updatedErrs)
    }
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const price  = target.value
                  setPrice(price)
        let updatedErrs = errors

        if(!price) {
          updatedErrs.price = "Please set an amount for your bill."
        } else {
          updatedErrs.price = ""
        }
        setErrors(updatedErrs)
    }

    const handleCategory = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const target = event.target as HTMLUListElement;
        if (target.tagName === 'LI') {
            const categoryName = target.innerText;
            const value  = target.getAttribute('data-value');
            setCategory({ name:categoryName, value: Number(value) });
        }
    };

    const handleReminder = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const target = event.target as HTMLUListElement;
        if (target.tagName === 'LI') {
            const reminderName = target.innerText;
            const value  = target.getAttribute('data-value');
            setReminder({ name: reminderName, value: Number(value) });
        }
    };

    const handleNextDue = (value: DateValueType) => {
        setNextdue(value)
    }

    
  const handleSave = async () => {
      let updatedErrs = errors
        if(!price || !name) return
         try {
        
        const result = await updateBillById(bill[0].id, {name, price, category, reminder, nextdue})
        if(result.error) {
          throw Error()          
        }
        clearForm()
        router.push("bills/all")
      
      } catch (error) {
        updatedErrs.save = `Could not add ${name} bill. Please try again later`
        setErrors(updatedErrs)
      }
       
     
  }   
  
  const clearForm = () => {
    setName("")
    setPrice("")
    setReminder({name: "", value: ""})
    setCategory({name: "", value: ""})
    setNextdue({startDate: getToday(), endDate: getToday()})
  }

  const togglePopup = () => {
      setopen(!open)
    }
  const handleDelete = async () => {
      const res = await deleteBillById(bill[0].id)
      if(res.error) {
        setnotification({
          type: "Error",
          message: "Could not delete bill. Please try again later."
        })
      } else {
        setnotification({
          type: "Success",
          message: "Bill successfully deleted!"
        })
        setTimeout(() => {
            router.push("/bills/all")
        }, 2000);
        togglePopup()
      }
    }

  return (
    <div>
    <section className='w-full md:w-2/3 mx-auto mt-4 p-2 border rounded'>
        {notification.message && <Notification duration={3000} type={notification.type} description={notification.message}/>}

        <ActionNav handleFn={handleSave} label="Edit Bill" action="Update"/>

          <div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            {errors.save && <Notification type="Error" description={errors.save} duration={5000}/>}
          </div>
          <div className=' flex justify-between mt-4'>
            <div className=' text-gray-600 '>Name</div>
            <input
              type="text"
              className="  w-64 text-right px-2 py-0 placeholder:text-slate-500 placeholder:font-medium font-medium focus:outline-none focus:border-b-2 hover:border-b border-amber-600"
              placeholder="Bill name" 
              value={name}
              onChange={handleNameChange}
              />
          </div>
          
          <div className=' flex justify-between mt-4'>
            <div className='text-gray-600'>Category</div>
          <FormSelectInput selected={category.name} handleFn={handleCategory}  items={categories} label=""/>
          </div>

          <div className=' flex justify-between mt-4'>
            <div className=' text-gray-600'>Price</div>
            <div className='flex'>
              <input
              type="number"
              className=" w-64 text-right px-2 py-0 placeholder:text-slate-500 placeholder:font-medium font-medium focus:outline-none focus:border-b-2 hover:border-b border-amber-600 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Ksh. 00" 
              value={price}
              onChange={handlePriceChange}
              />
            </div>
          </div>

          <div className=' flex justify-between mt-4'>
            <div className=' text-gray-600'>Next Bill</div>
              <Datepicker 
                useRange={false} 
                placeholder='yyyy/mm/dd'
                primaryColor={"amber"} 
                containerClassName=" relative focus:outline-none" 
                inputClassName="relative text-right px-2 py-0 placeholder:text-slate-500 placeholder:font-medium font-medium focus:outline-none focus:border-b-2 hover:border-b border-amber-600"
                toggleClassName="hidden"
                asSingle={true} 
                value={nextdue} 
                onChange={handleNextDue} 
          /> 
          </div>


          <div className=' flex justify-between mt-4'>
            <div className=' text-gray-600'>Remind me</div>
          <FormSelectInput selected={reminder.name} handleFn={handleReminder}  items={reminders} label=""/>
          </div>
          
        </section>
        {open && <div className="fixed z-10 top-1/3 left-1/2  transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center  p-4 shadow border rounded bg-white w-64">
      <p text-center>Are you sure you want to delete this bill?</p>
      <div className="flex justify-between mt-2">
        <button className="bg-gray-800 text-white p-2 text-xs rounded" onClick={togglePopup}>Cancel</button>
        <button className="bg-red-600 text-white p-2 text-xs rounded" onClick={handleDelete}>Delete</button>
      </div>
    </div>}
    <div className='flex justify-center mt-4'>
            <span>Want to delete this bill? </span>
            <button className='ml-2 text-red-600 hover:underline' onClick={togglePopup}>Delete</button>
          </div>
    </div>
  )
}
