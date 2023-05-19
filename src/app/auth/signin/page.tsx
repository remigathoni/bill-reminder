"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { useSupabase } from "@/providers/supabase-provider";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Page() {

  const {supabase} = useSupabase()

  const [email, setEmail] = useState("")
  const [isSent, setisSent] = useState(false)

  const sendMagicLink = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: 'http://localhost:3000',
    },
  })
  if(!error) {
    setisSent(true)
  }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };


  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const email  = target.value
    setEmail(email)
  }
  const handleSubmit = async () => {
    // send magic link
    if(email) {
      await sendMagicLink()
      setEmail("")
    }
  }
  const handleSignInGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  }
  return (
    <div className="relative flex flex-col md:flex-row h-screen">

      <section className="w-full h-full md:w-1/2 z-50  ">
        <div className="px-2 py-4">
          <Logo/>
        </div>
        <div className="flex flex-col justify-center mt-4 mx-auto w-3/4 bg-[#fafafa] md:bg-white w-[90vw]  md:w-3/4 h-2/3 border border-black md:border-none rounded-xl p-4  ">
          {isSent? <div className=" text-center">
            
            <h1 className="text-green-700 mb-2">Check your email!</h1>
           <p className="mb-2">A “magic link” has been emailed to you, containing a link you can click to log in.
            It should redirect you back to the site once you are logged in.</p>
            <p className=" mb-2">You can close this tab now.</p>
          </div>:<>
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <div className="mb-4">
            <Button text="Sign in with Google" backGroundColor="bg-white" handler={handleSignInGoogle}>
            <FcGoogle/>
          </Button>
          </div>
          <div className=" text-center mb-2">OR</div>
          <div className="mb-4">
            <Input label="Email" handler={handleEmail} value={email}/>
          </div>
          
          <Button text="Send magic link" backGroundColor="bg-yellow-950" handler={handleSubmit}>
          </Button>
        </>}
        </div>
        
      </section>

      <section className="bg-[url('/auth-pattern.svg')] bg-no-repeat bg-cover w-full md:w-1/2 h-1/3 md:h-auto rounded-t-xl md:rounded-none absolute md:relative bottom-0  ">
      </section>
    </div>
  )
}
