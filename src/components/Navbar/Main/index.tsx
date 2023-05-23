"use client"
import Logo from "@/components/Logo";
import { useSupabase } from '@/providers/supabase-provider';
import { motion } from "framer-motion";
import Link from "next/link";

const MainNav =  () => {
    const { session, supabase } = useSupabase();
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };
    return (
        <div className="flex items-center justify-between">
            <Logo/>
            <div className="min-w-fit">
                {session?<motion.button 
    whileHover={{ scaleX: 1.02 }}
    whileTap={{ scaleX: 0.98 }}
    className={` p-2 underline `} onClick={handleLogout}>
           Sign out
        
    </motion.button>:<motion.div 
    whileHover={{ scaleX: 1.02 }}
    whileTap={{ scaleX: 0.98 }}
    className={` p-2 underline `} onClick={handleLogout}>
           <Link href={"/auth/signin"}>Sign in</Link>
        
    </motion.div>}
            </div>
            
            
        </div>
    )
}

export default MainNav