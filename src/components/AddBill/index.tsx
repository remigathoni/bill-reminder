"use client"
import { createNewBill } from "@/utils/bill";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import FormInput from "../Input/FormInput";
import FormSelectInput from "../Input/FormSelectInput";
import ActionNav from "../Navbar/ActionNav";
import Notification from "../Notification";
export const categories = [
  { name: "Subscriptions", value: "" },
  { name: "Housing", value: "" },
  { name: "Utilities", value: "" },
  { name: "Insurance", value: "" },
  { name: "Food", value: "" },
  { name: "Education", value: "" },
  { name: "Savings", value: "" },
  { name: "Debt", value: "" },
]
export const reminders = [
  { name: "Same day", value: 0 },
  { name: "1 day before", value: 1 },
  { name: "Don't remind me", value: 2 },
];

const getToday = () => {
    return new Date().toISOString().slice(0, 10)
  }

const AddBill = ({userId}:{userId: string|undefined}) => {
  const router = useRouter()

    const [errors, setErrors] = useState({price: "",
        name: "",
        save: ""})
    
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState<{ name: string; value: number | null; }>({name:"", value:null})
    const [reminder, setReminder] = useState<{ name: string; value: number | null; }>({name:"", value:null})
    const [nextdue, setNextdue] = useState<DateValueType>({
      startDate: getToday(),
      endDate: getToday()
    });

    

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const clearForm = () => {
      setName("")
      setPrice("")
      setReminder({name:"", value: null})
      setCategory({name:"", value: null})
      setNextdue({startDate: getToday(), endDate: getToday()})
  }
  const handleSave = async () => {
      let updatedErrs = errors
        if(!price || !name) return
         try {
        
        const result = await createNewBill({name, userId,price, category:category.name, reminder:reminder.value, nextdue:nextdue?.endDate} )
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
        
  
         
   
  return (
    <div className="w-full md:w-2/3 mx-auto p-2 border rounded">
        <ActionNav handleFn={handleSave} label="Add Bill" action="Save"/>
        <section>
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            {errors.save && <Notification type="Error" description={errors.save} duration={5000}/>}
            <FormInput label="Name" type="text" onChangeFn={handleName} value={name} placeholder="Bill name" />
            <FormInput label="Amount" type="number" onChangeFn={handlePriceChange} value={price} placeholder="Ksh.00" />
            <FormSelectInput selected={category.name} handleFn={handleCategory}  items={categories} label="Category"/>
            <div className=' flex justify-between mt-4'>
            <div className='text-sm text-gray-600'>Next Bill</div>
              <Datepicker 
                useRange={false} 
                placeholder='yyyy/mm/dd'
                primaryColor={"yellow"} 
                containerClassName=" relative focus:outline-none" 
                inputClassName="relative text-sm text-right px-2 py-0 text-gray-600 placeholder:text-gray-600 placeholder:font-medium font-medium focus:outline-none focus:border-yellow-600 hover:border-b border-gray-600"
                toggleClassName="hidden"
                asSingle={true} 
                value={nextdue} 
                onChange={handleNextDue} 
          /> 
          </div>
          <FormSelectInput selected={reminder.name} handleFn={handleReminder}  items={reminders} label="Remind me"/>

        </section>
    </div>
  )
}

export default AddBill