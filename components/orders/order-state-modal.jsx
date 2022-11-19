import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SelectBox from '../ui/select-box';

const statusList = [
  { id: 'unverified', name: 'در انتظار تایید' },
  { id: 'verified', name: 'آماده سازی سفارش' },
  { id: 'posted', name: 'تحویل به مامور ارسال' },
  { id: 'delivered', name: 'تحویل مرسوله به مشتری' }
];

export default function OrderStatusModal({ isOpen, closeModal, handleSave }) {
  const [orderState, setOrderState] = useState(statusList[0]);

  const handleChangeStatus = selected => {
    setOrderState(selected);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-900/50' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 align-middle transition-all transform bg-white shadow-xl rounded-md'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-800'
                >
                  انتخاب وضعیت سفارش
                </Dialog.Title>
                <div className='mt-3'>
                  <p className='text-sm text-gray-500'>
                    لطفا وضعیت سفارش را از لیست پایین انتخاب نمایید:
                  </p>
                </div>

                <SelectBox
                  title='&nbsp;'
                  items={statusList}
                  handleChangeSelect={handleChangeStatus}
                  defaultIndex={0}
                />

                <div className='mt-6 flex justify-center gap-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={() => handleSave(orderState)}
                  >
                    ذخیره
                  </button>

                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-rose-900 bg-rose-200 border border-transparent rounded-md hover:bg-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500'
                    onClick={closeModal}
                  >
                    لغو
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
