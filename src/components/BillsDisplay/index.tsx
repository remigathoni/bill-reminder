import { dueSoon, formatCurrency, getAllBills, getAllUnpaidBills } from '@/utils/bill';
import Image from 'next/image';
import BillsList from '../BillList';
import DueList from '../DueList';

async function getData(userId:string) {
  const res = await getAllBills(userId);
  // Recommendation: handle errors
  if (res.error) {
    console.log(res.error)
    // This will activate the closest `error.js` Error Boundary
  }

  return res;
}

async function getUnpaid() {
  const res = await getAllUnpaidBills();
  // Recommendation: handle errors
  if (res.error) {
    // This will activate the closest `error.js` Error Boundary
  }

  return res;
}


export default async function BillsDisplay({userId}:{userId:string}) {
    const res = await getData(userId);
    const data = res.data
    const total = res.total
    const unpaid = await getUnpaid()
    const unpaidData = unpaid.data
    const unpaidTotal = unpaid.total
    const billsDue =  unpaidData?.filter(item => dueSoon(item.nextdue)) || []
    let totalDue = 0;
    for (let i in billsDue ) {
      totalDue += billsDue[i].price;
    }
    let formattedTotalDue = formatCurrency(totalDue);
    
  return (
    <div className=' w-full md:w-2/3 mx-auto mt-4 p-2 border rounded'>
      <section className=' mt-8'>
        <div className="flex justify-between p-2  " style={{backgroundColor: "#F4F1F2"}}>
            <div className=" font-medium">Due soon</div>
            <div className="font-medium ">{billsDue?formattedTotalDue:"Ksh.00"}</div>
        </div>
        <div>
            {billsDue.length<1 || !data?<p className="text-center  py-2">No dues soon</p>:<div ><DueList data = {billsDue}/></div>}
            
        </div>
        </section>

        <section className=' mt-10 '>
        <div className="flex justify-between  p-2 " style={{backgroundColor: "#F4F1F2"}}>
            <div className=" font-medium">Unpaid bills</div>
            <div className="font-medium ">{unpaidData?unpaidTotal:"Ksh.00"}</div>
        </div>
        {!unpaidData?<div className="flex flex-col justify-center items-center p-4">
            <p className="text-center py-2">All bills are paid</p>
        </div>:<div className=' py-4'><BillsList data = {unpaidData}/></div>}
        </section>

        <section className=' mt-10 '>
        <div className="flex justify-between  p-2 " style={{backgroundColor: "#F4F1F2"}}>
            <div className=" font-medium ">All bills</div>
            <div className="font-medium ">{data?total:"Ksh.00"}</div>
        </div>
        {!data?<div className="flex flex-col justify-center items-center p-4">
            <section>
          <Image src="../taken.svg" alt="" width={200} height={200}/>
        </section>
            <p className=" text-center py-2">This is where all bills usually are but its empty at the moment.  
            Add your first bill by clicking the “+” button.</p>
        </div>:<div className='py-4'><BillsList data = {data}/></div>}
        </section>
    </div>
  )
}