import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';

export default function SelectBox({
  title,
  items,
  defaultIndex,
  handleChangeSelect
}) {
  // console.log(items)
  const [selected, setSelected] = useState(items[defaultIndex] || items[0]);

  const handleChange = e => {
    setSelected(e);
    handleChangeSelect(e);
  };
  // for initial set state of parent component
  // useEffect(() => {
  //   if(items.length > 0){
  //     setSelected(items[0]);
  //     handleChangeSelect(items[0]);
  // }
  // }, [items]);

  return (
    <div className='text-right'>
      <Listbox value={selected} onChange={handleChange}>
        <label className='mb-2 text-gray-500'>{title}</label>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full py-2 pr-3 pl-10 text-right bg-white rounded border border-gray-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500'>
            <span className='block truncate'>{selected&&selected.name}</span>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none'>
              <FaChevronDown
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none sm:text-sm'>
              {items.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-700'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-blue-600' : 'text-blue-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <FaCheck className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
