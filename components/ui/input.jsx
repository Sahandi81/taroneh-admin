import cn from 'classnames'

export default function Input({label, error, currency, handleChange, ...otherProps}) {
  return (
    <div className='flex flex-col text-right w-full relative'>
      <label htmlFor={otherProps.id} className='mb-2 text-gray-500'>{label}</label>
      <input onChange={handleChange} {...otherProps} className={cn('rounded border border-gray-200 py-2 px-3 text-gray-700 outline-none shadow-blue-200 focus:border-blue-600 focus:shadow-sm', {
        ['focus:border-red-500']: error
      })} />
      {currency && <p className='text-red-500 bg-red-100 absolute top-2/4 left-2 py-1 px-2 text-sm rounded cursor-default'>تومان</p>}
      <small className='mt-1 pr-1 text-red-500'>{error}</small>
    </div>
  )
}
