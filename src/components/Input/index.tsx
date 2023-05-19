

interface inputProps {
    label: string,
    handler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}
const Input = ({label, handler, value}: inputProps) => {
    return(
        <div>
            <label htmlFor={label} className="text-gray-500 text-sm">{label}</label>
            <input type="text" id={label} value={value} onChange={handler} className="border border-gray-500 p-2 rounded flex items-center justify-center w-full"/>
        </div>
    )
}

export default Input