import Select from "../../Select";

interface FormSelectInput {
  selected: string,
  handleFn: (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => void,
  items: { name: string; value: any; }[],
  label: string
}
export default function FormSelectInput({selected, handleFn, items, label}:FormSelectInput) {
  return (
    <div className=' flex justify-between mt-4'>
        <div className=' text-gray-600'>{label}</div>
        <Select selected={selected} handleSelected={handleFn}  items={items} />
    </div>  )
}
