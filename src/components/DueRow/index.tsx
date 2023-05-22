import { iRetrievedBill } from "@/lib/types/bill.types"
import { getDueDays } from "@/utils/bill"
import { motion } from "framer-motion"
import Link from "next/link"

type colors = {
    default: string;
    subscriptions: string;
    housing: string;
    education: string;
    utilities: string;
    insurance: string;
    health: string;
    investment: string;
    debt: string;

}
const colors:colors = {"default":"bg-violet-100", "subscriptions":"bg-violet-100",  "housing":"bg-amber-100", "education":"bg-purple-100", "utilities":"bg-red-100", "insurance":"bg-fuchsia-100", "health":"bg-fuchsia-100", "investment":"bg-fuchsia-100", "debt":"bg-fuchsia-100"}

export default function DueRow({title, date, price, category, id}:iRetrievedBill) {
    const dueData = getDueDays(date || "")
    const isCategory = category || "default"
  return (
    <motion.div
      key={"dueitem"}
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}

    >
    <Link href={`/bills/view/?id=${id}`} className={`flex  justify-between px-2 py-4 ${colors[isCategory as keyof colors]} w-full rounded`}>
        <div className="">
            <h1 className=" leading-none mb-2">{title}</h1>
            <p className=" text-gray-600 leading-none tracking-wide">{dueData.due}</p>
        </div>
        <div className="  tracking-widest">Ksh. {price}</div>
    </Link>
    </motion.div>
  )
}
