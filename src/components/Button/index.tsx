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
    className={` border border-black p-2 rounded flex items-center justify-center w-full ${backGroundColor}`} onClick={handler}>
        <div className="flex items-center">
            {children}
            <div className="text-md ml-2">{text}</div>
        </div>
        
    </motion.button>
  )
}
export default Button