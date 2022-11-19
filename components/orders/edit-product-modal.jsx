import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SelectBox from '../ui/select-box';
import Input from '../ui/input';

const packageList = [
  { id: '50', name: '50 گرمی' },
  { id: '100', name: '100 گرمی' },
  { id: '250', name: '250 گرمی' },
  { id: '300', name: '300 گرمی' },
  { id: '500', name: '500 گرمی' },
  { id: '1000', name: '1000 گرمی' },
  { id: '1200', name: '1200 گرمی' },
  { id: 'package', name: 'بسته ای' },
  { id: 'one', name: 'دانه ای' }
];

export default function EditProductModal({
  isOpen,
  closeModal,
  currentPack,
  currentWeight,
  handleSave
}) {
  const [pack, setPack] = useState(packageList[0]);
  const [weight, setWeight] = useState(currentWeight);
  const [currentIndex, setCurrentIndex] = useState(
    packageList.findIndex(p => p.name === currentPack)
  );

  const handleChangeWeight = e => setWeight(e.target.value);

  const handleChangePackage = selected => {
    setPack(selected);
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
                  تغییر محصول
                </Dialog.Title>
                <div className='mt-3'>
                  <p className='text-sm text-gray-500'>
                    لطفا تغییرات خود را اعمال نمایید:
                  </p>
                </div>

                <div className='flex flex-col gap-4'>
                  <SelectBox
                    title='نوع'
                    items={packageList}
                    handleChangeSelect={handleChangePackage}
                    defaultIndex={currentIndex}
                  />

                  <Input
                    id='weight'
                    name='weight'
                    label='وزن / تعداد'
                    type='number'
                    handleChange={handleChangeWeight}
                    value={weight}
                    required
                  />
                </div>

                <div className='mt-6 flex justify-center gap-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={() => handleSave(weight, pack.name)}
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
