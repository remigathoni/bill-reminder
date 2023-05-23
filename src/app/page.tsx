import LinkBtn from "@/components/Button/LinkBtn";
import MainNav from "@/components/Navbar/Main";

export default function Home() {
  return (
    <div className="px-6 py-4">
    <MainNav/>
    <main className="w-full md:w-2/3 mt-16 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-2">Effortlessly Manage Your Monthly Bills </h1>
      <h2 className=" w-full md:w-2/3 text-md md:text-2xl  text-center mb-4 ">Categorize your bills, set up reminders, and never miss a payment deadline again.</h2>
      <LinkBtn bgColor="bg-yellow-950" text="Track you first bill" href="/bills/add"/>
    </main>
    </div>
  )
}
