"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  const [email, setEmail] = useState("")
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const email  = target.value
    setEmail(email)
  }
  const handleSubmit = () => {
    // send magic link
  }
  const handleSignInGoogle = () => {
    
  }
  return (
    <div className="relative flex flex-col md:flex-row h-screen">

      <section className="w-full h-full md:w-1/2 z-50  ">
        <div className="px-2 py-4">
          <Logo/>
        </div>

        <div className="flex flex-col justify-center mt-4 mx-auto w-3/4 bg-[#fafafa] md:bg-white w-[90vw]  md:w-3/4 h-2/3 border border-black md:border-none rounded-xl p-4  ">
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
        </div>
      </section>

      <section className="bg-[url('/auth-pattern.svg')] bg-no-repeat bg-cover w-full md:w-1/2 h-1/3 md:h-auto rounded-t-xl md:rounded-none absolute md:relative bottom-0  ">
      </section>
    </div>
  )
}
