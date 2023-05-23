import { Prata } from 'next/font/google';
import Link from 'next/link';
import BlurredCircle from "./BlurredCircle";
const prata = Prata({ weight:"400", subsets:['latin'] })
export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center">
        <BlurredCircle/>
        <div className={`text-lg text-black ml-2 ${prata.className}`}>billmate</div>
    </Link>
  )
}
