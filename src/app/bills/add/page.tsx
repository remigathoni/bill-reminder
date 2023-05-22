"use client"
import AddBill from "@/components/AddBill";
import { useSupabase } from "@/providers/supabase-provider";

export default function Page() {
    const {supabase, session} = useSupabase()
  return (
    <AddBill userId= {session?.user.id}/>
  )
}
