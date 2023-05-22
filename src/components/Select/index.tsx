"use client"
import { useState } from 'react';
import { RxChevronDown } from 'react-icons/rx';

interface select {
  items: { name: string; value: number | null; }[],
  handleSelected: (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => void,
  selected: string
}
export default function Select({items, handleSelected, selected}:select) {
    const [isOpen, setOpen] = useState(false);

    const handleDropDown = () => {
        setOpen(!isOpen);
    };    
    
    const handleClick = () => {
        setOpen(!open)
    }
    
  return (
    <div className='relative flex flex-col justify-end  pr-2 '>
              <button
                className="  inline-flex justify-end items-center text-gray-600 hover:text-gray-900  text-right bg-white focus:ring-blue-300 font-medium" 
                type="button"
                onClick={handleDropDown}>
                  <div className={`${isOpen?"text-amber-600":""}`}>{selected?selected: "Select"}</div> 
                  <RxChevronDown />
                </button>
                <div 
        className={`z-10 absolute top-8 right-0 w-44 bg-white rounded divide-y divide-gray-100 shadow w-44 ${
          isOpen ? "flex justify-end" : "hidden"
        }`}>
    <ul className=" w-full py-2  text-right bg-white text-gray-800" aria-label="Bill categories" onClick={handleSelected}>
      {items.map((item, index) => (
        <li key={index} data-value={item.value} className=" px-4 py-2 hover:bg-gray-100 cursor-pointer select-none capitalize" onClick={handleClick}>{item.name}
      </li>
      ))}
    </ul>
</div>
</div>
  )
}
