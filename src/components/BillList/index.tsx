import BillRow from "../BillRow";

type Bills = {
    data: { [x: string]: any; }[]
    
}
export default function BillsList({data}:Bills) {
  return (
    <div className="">
        {data.map((item) => {
            return <BillRow key={item.id} id={item.id} title={item.name} price={item.price} category={item.category} date={item.nextdue} paid={item.paid}/>
        } )}
    </div>
  )
}
