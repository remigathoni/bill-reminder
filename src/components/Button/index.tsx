import React from 'react';

import { motion } from "framer-motion";

type ButtonProps = {
  children?: React.ReactNode;
  backGroundColor: string;
  text: string,
  handler: () => void
};


 const Button = ({children, backGroundColor, text, handler}:ButtonProps) => {
  return (
    <motion.button 
    whileHover={{ scale: 1.01, backgroundColor:"#f1f2eb" }}
    whileTap={{ scale: 0.99 }}
    className={`flex items-center justify-center p-2 rounded-lg border-2 border-black w-full  ${backGroundColor}`} onClick={handler}>
        <div className="flex items-center">
          {children && <div className='mr-2'>{children} </div>}
                     
            <div className="text-sm md:text-md">{text}</div>
        </div>
        
    </motion.button>
  )
}
export default Button