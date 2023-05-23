"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BsChevronLeft } from "react-icons/bs"
interface LinkNav {
    href: string,
    text: string,
    label: string
}
export default function LinkNav({href, text, label}:LinkNav) {
  const router = useRouter()
  return (
    <nav className="flex justify-between text-sm font-semibold tracking-widest mt-4 pb-2 border-b-2">
          <motion.button 
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.99 }} onClick={() => router.back()} className="flex items-center hover:scale-90 active:scale-75 focus:scale-90"> 
          <BsChevronLeft className="p-0 mr-2 w-4 h-4"/>
          <span>{label}</span>
          </motion.button>

          
        <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.99 }} className="text-yellow-950">
            <Link href={href}>{text}</Link>
        </motion.div>
    </nav>
  )
}
