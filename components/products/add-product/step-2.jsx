import { useState } from 'react';
import Input from '../../ui/input';
import SelectBox from '../../ui/select-box';

export default function AddProductStep2({
  product,
  typeOrWeight,
  currentType,
  handleChange,
  handleBack,
  handleChangeTypeOrWeight
}) {
  let fields;
  switch (currentType.id) {
    case 'tow01':
      // fields = (
      //   <Input
      //     id='f250'
      //     name='f250'
      //     label='قیمت (250 گرم)'
      //     type='number'
      //     handleChange={handleChange}
      //     value={product.title}
      //     autoFocus
      //     required
      //   />
      // );
      break;
    case 'tow02':
      break;
    case 'tow03':
      break;
    case 'tow04':
      break;
    case 'tow05':
      break;
    default:
      break;
  }

  return (
    <>
      <SelectBox
        title='نوع / وزن'
        items={typeOrWeight}
        handleChangeSelect={handleChangeTypeOrWeight}
      />

      {fields}

      <div className='flex justify-center gap-2 w-full mt-10'>
        <button
          className='flex-1 py-2 px-4 rounded bg-blue-500 text-white hover:shadow-md hover:shadow-blue-500/50 transition-shadow'
          type='submit'
        >
          ذخیره و ادامه
        </button>
        <button
          className='flex-1 py-2 px-4 rounded bg-red-500 text-white hover:shadow-md hover:shadow-red-500/50 transition-shadow'
          type='button'
          onClick={handleBack}
        >
          بازگشت
        </button>
      </div>
    </>
  );
}
