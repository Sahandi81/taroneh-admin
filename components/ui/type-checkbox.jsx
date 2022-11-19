import cn from 'classnames';

export default function TypeCheckbox({ id, label, checked, handleChange }) {
  return (
    <div>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className='hidden'
      />
      <label
        htmlFor={id}
        className={cn('border rounded block py-1 px-3 cursor-pointer whitespace-nowrap', {
          'border-green-300': checked,
          'text-green-700': checked,
          'bg-green-300': checked,
          'text-gray-700': !checked
        })}
      >
        {label}
      </label>
    </div>
  );
}
