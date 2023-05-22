import { getAllBills } from "@/utils/bill";

async function getData(userId:string) {
  const res = await getAllBills(userId);
  // Recommendation: handle errors
  if (res.error) {
    console.log(res.error)
    // This will activate the closest `error.js` Error Boundary
  }

  return res;
}

const ViewBills = () => {
  return (
    <div>ViewBills</div>
  )
}

export default ViewBills