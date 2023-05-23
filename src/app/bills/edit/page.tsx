import EditBill from '@/components/EditBill';
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
export default async function Page({
  searchParams,
}:{searchParams: {id: string}}) {
     const id = searchParams.id
     
    const bill = await getData(id)

  return (
    <main className={jssans.className}>
        {bill && <EditBill bill={bill}/>}
    </main>
  )
}
