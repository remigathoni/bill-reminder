import LinkNav from '@/components/Navbar/LinkNav';
import ViewBill from '@/components/ViewBill';
import { getBillById } from '@/utils/bill';
import { Josefin_Sans } from 'next/font/google';

const jssans = Josefin_Sans( {weight: '400',
  subsets: ['latin']})

  async function getData(id:string) {
  const res = await getBillById(id)
  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
}
export const revalidate =0
export default async function Page({searchParams}:{searchParams:any}) {
 
  const id = searchParams.id
  const bill = await getData(id)
    
  return (
    <main className={jssans.className}>
      {bill &&<>
      <LinkNav label={bill[0]?.name} href={`/bills/edit/${id}`} text='Edit'/>
        <ViewBill bill={bill || []}/>
        
        </>  }
       
    </main>
  )
}
