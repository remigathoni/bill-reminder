"use client"
import BillsDisplay from "@/components/BillsDisplay";
import { useSupabase } from "@/providers/supabase-provider";

export default function Page() {
    const {supabase, session} = useSupabase()
  return (
    <>
    {/* @ts-expect-error Server Component */}
      <BillsDisplay userId= {session?.user.id}/>
    </>
  )
}


          
