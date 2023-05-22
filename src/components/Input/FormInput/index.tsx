"use client"
interface FormInput {
    value: string,
    type: string,
    placeholder: string,
    onChangeFn: (event: React.ChangeEvent<HTMLInputElement>) => void,
    label: string
}
export default function FormInput({value, type, placeholder, onChangeFn, label}:FormInput) {
  return (
    <div className=' flex justify-between mt-4'>
        <div className='text-sm text-gray-600'>{label}</div>
        <div className='flex'>
            <input
            type={type}
            className="text-xs md:text-sm  text-right px-2 py-0 placeholder:text-slate-500 placeholder:font-medium font-medium focus:outline-none focus:border-amber-600 hover:border-b border-gray-600 [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            placeholder={placeholder} 
            value={value}
            onChange={onChangeFn}
            />
        </div>
    </div>
  )
}
