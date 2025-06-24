import { useId, forwardRef } from 'react'


const Input = forwardRef(function input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>}
            <input 
            type={type} 
            className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input