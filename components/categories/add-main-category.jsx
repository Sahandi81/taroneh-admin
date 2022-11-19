import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Input from '../ui/input';
import Spinner from '../ui/spinner';
import {useAddCategoryMutation, useAddProductMutation, useUploadPhotoMutation} from '@/features/api/apiSlice';
import { toast } from 'react-toastify';
import { CATEGORY_ADDED_SUCCESSFULLY } from '@/data/messages';
import {FaTimes} from "react-icons/fa";
import Image from "next/image";
import {nanoid} from "nanoid";
import {API_URL} from "@/config/index";
import {useSelector} from "react-redux";
import {selectUploadImageToken} from "@/features/admin/adminSlice";

export default function AddMainCategory({ isOpen, closeModal }) {
  const [name, setName] = useState({
    value: '',
    error: ''
  });

  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const imageUploadToken = useSelector(selectUploadImageToken);

  const handleChange = e => {
    const { value } = e.target;

    setName({ error: '', value });
  };

  const handleCancel = () => {
    setName({ error: '', value: '' });
    closeModal();
  };

  const handleSubmit = async e => {
    e.preventDefault();


    const uploadedImageNames = [];
  
    try {
      for (let i = 0; i < images.length; i++) {
        const formdata = new FormData();
        formdata.append('file', images[i].file);
        formdata.append('type', images[i].file.type);
        formdata.append('name', images[i].file.name);
        const result = await fetch(
            `${API_URL}/api/admin/upload_photo`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${imageUploadToken}`
              },
              body: formdata
            }
        );
        const data = await result.json();
        uploadedImageNames.push(data.file);
      }
    } catch (error) {
      toast.error(error);
    }

    const photos = uploadedImageNames.slice();

    try {
      const result = await addCategory({ name: name.value,  photos}).unwrap();
      if (result.success)
        toast.success(CATEGORY_ADDED_SUCCESSFULLY);
    } catch (error) {
      toast.error(error.message);
    }
    setName({ error: '', value: '' });
    closeModal();
  };

  const handleChangeImage = e => {
    
    const {files} = e.target;
    if(files["0"].size > 1000000){
      toast.error('حجم عکس بیش از  1مگابایت است')
      return
    }
    // console.log(files["0"].size)
    const newImages = [];
    Object.values(files).forEach(file => {
      newImages.push({
        id: nanoid(10),
        file
      });
    });

    if (newImages.length) {
      setImages(prevImages => prevImages.concat(newImages));
    }
  };

  const handleDeleteImage = imgId => {
    setImages(prevImages => prevImages.filter(image => image.id !== imgId));
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
              <div className='relative inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-md'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-800'
                >
                  افزودن شاخه اصلی
                </Dialog.Title>
                <form onSubmit={handleSubmit} className='mt-8'>
                  <Input
                    id='name'
                    name='name'
                    label='نام'
                    type='text'
                    handleChange={handleChange}
                    value={name.value}
                    error={name.error}
                    autoFocus
                    required
                  />

                  <div className='flex flex-col text-right w-full relative mt-2'>
                    <p className='block mb-2 text-gray-500'>تصویر دسته بندی</p>
                    <label
                        htmlFor='productImage'
                        className='block py-2 px-5 whitespace-nowrap mb-2 text-white bg-emerald-400 hover:shadow-green-200 hover:shadow-md transition duration-200 rounded cursor-pointer w-fit'
                    >
                      انتخاب عکس{' '}
                    </label>
                    <input
                        id='productImage'
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={handleChangeImage}
                        className='hidden'
                        multiple
                    />

                    <div className='flex gap-7'>
                      {imageURLs.map(imgURL => (
                          <div
                              key={imgURL.id}
                              className='border rounded mt-5 relative'
                              title='حذف'
                          >
                            <button
                                type='button'
                                className='absolute z-50 -top-3 -left-3 rounded-full flex justify-center items-center w-7 h-7 bg-red-100 text-rose-500'
                                onClick={() => handleDeleteImage(imgURL.id)}
                            >
                              <FaTimes size={16} />
                            </button>
                            <Image
                                src={imgURL.url}
                                alt='Product Image'
                                width={100}
                                height={100}
                            />
                          </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex justify-center gap-2 w-full mt-10'>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <button
                          className='flex-1 py-2 px-4 rounded bg-blue-500 text-white hover:shadow-md hover:shadow-blue-500/50 transition-shadow'
                          type='submit'
                        >
                          ایجاد
                        </button>
                        <button
                          className='flex-1 py-2 px-4 rounded bg-red-500 text-white hover:shadow-md hover:shadow-red-500/50 transition-shadow'
                          type='button'
                          onClick={handleCancel}
                        >
                          انصراف
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
