"use client"
import Button from "@/components/Button";
import LinkBtn from "@/components/Button/LinkBtn";
import Logo from "@/components/Logo";
import { useSupabase } from '@/providers/supabase-provider';

const MainNav =  () => {
    const { session, supabase } = useSupabase();
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };
    return (
        <div className="flex items-center justify-between">
            <Logo/>
            <div className="min-w-fit">
                {session?<Button handler={handleLogout} backGroundColor="#f1f2eb" text="Sign out"/>:<LinkBtn href="/auth/signin" text={"Sign in"}/>}
            </div>
            
        </div>
    )
}

export default MainNav