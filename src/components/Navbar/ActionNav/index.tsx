"use client"
import { motion } from "framer-motion"
interface ActionNav {
    handleFn:() => void,
    label: string,
    action: string
}
export default function ActionNav({handleFn, label, action}:ActionNav) {
  return (
    <nav className="flex justify-between text-sm font-semibold tracking-widest mt-4 pb-2 border-b-2">
        <div>{label}</div>
        <motion.button 
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.99 }} className="text-yellow-950" onClick={handleFn}>
            {action}
        </motion.button>
    </nav>
  )
}
