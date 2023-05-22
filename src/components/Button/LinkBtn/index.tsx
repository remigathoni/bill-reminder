"use client"
import { motion } from "framer-motion";
import Link from "next/link";

interface LinkBtn {
    href: string,
    text: string
}
const LinkBtn = ({href, text}: LinkBtn) => {
    return (
        <Link href={href} className="font-bold">
            <motion.button 
                whileHover={{ scale: 0.98, backgroundColor:"#f1f2eb" }}
                whileTap={{ scale: 0.99 }}
                className="p-2 rounded-lg border-2 border-black">
                {text}
            </motion.button>
        </Link>
    )
}

export default LinkBtn