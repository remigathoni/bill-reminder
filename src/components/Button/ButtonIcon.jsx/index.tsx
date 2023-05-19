import React from 'react';


type ButtonProps = {
  children?: React.ReactNode;
  backGroundColor: string;
  text: string,
  handler: () => void
};


 const Button = ({children, backGroundColor, text, handler}:ButtonProps) => {
  return (
    <button className={` border border-black p-2 rounded flex items-center justify-center w-full ${backGroundColor}`} onClick={handler}>
        <div className="flex items-center">
            {children}
            <div className="text-md ml-2">{text}</div>
        </div>
        
    </button>
  )
}
export default Button