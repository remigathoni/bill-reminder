"use client"
import LinkBtn from "@/components/Button/LinkBtn";
import MainNav from "@/components/Navbar/Main";
import { useSupabase } from "@/providers/supabase-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {session} = useSupabase()
  const router = useRouter()
  useEffect(() => {
    console.log(session)
    if(session) {
     router.push('/bills/all');
  } 
  }, [session, router]);
  return (
    <div className="relative px-6 pt-4 min-h-screen">
    <MainNav/>
    <main className="  w-full md:w-2/3 mt-16 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-6">Effortlessly Manage Your Monthly Bills </h1>
      <h2 className=" w-full md:w-2/3 text-md md:text-2xl  text-center mb-6 ">Categorize your bills, set up reminders, and never miss a payment deadline again.</h2>
      <LinkBtn bgColor="bg-yellow-950" text="Track you first bill" href="/bills/add"/>

    </main>
    <div className=" w-10/12 mx-auto h-2/5 bg-top bg-cover bg-no-repeat bg-hero-mobile md:bg-hero-desktop absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0"></div>

    </div>
  )
}
