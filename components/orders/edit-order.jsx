import { useState } from 'react';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';
import cn from 'classnames';
// import moment from 'jalali-moment';
import Table from '../ui/table';
import OrderStatusModal from './order-state-modal.jsx';
import { toast, ToastContainer } from 'react-toastify';

import { useUpdateOrderMutation,  useGetUserByIdQuery } from '@/features/api/apiSlice';
import EditProductModal from './edit-product-modal';
import { ORDER_UPDATED_SUCCESSFULLY } from '@/data/messages';
import { calender } from '@/data/calender';

const header = [
  'نام محصول',
  'نوع',
  'وزن / تعداد',
  'قیمت واحد (تومان)',
  'قیمت کل (تومان)',
  'عملیات'
];

export default function EditOrder({ order }) {
  const [currentOrder, setCurrentOrder] = useState({
    id: order.id,
    code: order.code,
    customer: order.customer,
    price: order.price,
    status: { id: order.status, name: order.status },
    date: order.date,
    address: order.order_address?.address,
    products: order.products,
    phone: order.users.phone,
    postal: order.order_address?.postal_code
  });
  console.log(order,'order')
  // const {data }=  useGetUserByIdQuery();

  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    title: '',
    type: '',
    weight: '',
    price: '',
    totalPrice: ''
  });
  // console.log(order)
  const [isChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
  const [isChangeProductOpen, setIsChangeProductOpen] = useState(false);

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const closeChangeStatusModal = () => setIsChangeStatusOpen(false);
  const openChangeStatusModal = () => setIsChangeStatusOpen(true);

  const closeChangeProductModal = () => setIsChangeProductOpen(false);
  const openChangeProductModal = item => {
    setCurrentProduct(item);
    setTimeout(() => setIsChangeProductOpen(true), 100);
  };

  const handleSaveStatus = orderStatus => {
    setCurrentOrder(prevState => ({
      ...prevState,
      status: orderStatus
    }));
    closeChangeStatusModal();
  };

  const handleSaveProduct = (weight, type) => {
    setTimeout(() => {
      const updatedProducts = currentOrder.products.map(prd => {
        if (prd.id === currentProduct.id) {
          return {
            ...prd,
            type,
            weight
          };
        }
        return prd;
      });

      setCurrentOrder(prevState => ({
        ...prevState,
        products: updatedProducts
      }));

      closeChangeProductModal();
    }, 100);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setCurrentOrder(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    updateOrder({
      id: currentOrder.id,
      condition: currentOrder.status.name,
      address: 1
    })
      .unwrap()
      .then(data => {
        if (data.success) toast.success(ORDER_UPDATED_SUCCESSFULLY);
        else toast.error(data.msg || 'Server Error!!!');
      })
      .catch(error => {
        toast.error(JSON.stringify(error.data.errors) || 'Server Error!!!');
      });
  };

  return (
    <div className='flex flex-col bg-white rounded-lg p-6 pb-10 shadow-lg shadow-slate-400/10'>
      <h1 className='text-lg font-semibold text-gray-700'>تغییر سفارش</h1>
      {/* Header Details */}
      <div className='grid lg:grid-cols-2 gap-y-4 gap-x-8 items-center mt-8 auto-rows-max'>
        <div>
          <span className='text-gray-500'>شناسه: &nbsp;</span>
          <span className='text-gray-900 font-medium'>
            {currentOrder.code}&nbsp;#
          </span>
        </div>

        <div>
          <span className='text-gray-500'>وضعیت سفارش: &nbsp;</span>
          <span className='text-gray-900 font-medium'>
            {currentOrder.status.name}
          </span>
          <button
            title='تغییر وضعیت'
            type='button'
            onClick={openChangeStatusModal}
            className='inline-flex justify-center items-center gap-2 text-rose-500 mr-2 px-2 py-2 bg-transparent rounded-md border-none focus:outline-none'
          >
            <FaRegEdit size='20' />
          </button>
        </div>

        <div>
          <span className='text-gray-500'>مشتری: &nbsp;</span>
          <span className='text-gray-900 font-medium'>
            {currentOrder.customer}
          </span>
        </div>

        <div>
          <span className='text-gray-500'>تاریخ سفارش: &nbsp;</span>
          <span  dir='rtl' className='text-gray-900 font-medium'>
            {/* {moment(currentOrder.date).locale('fa').format('YYYY/MM/DD')} */}
            {calender(currentOrder.date)}
          </span>
        </div>

        <div>
          <span className='text-gray-500'>شماره مشتری: &nbsp;</span>
          <span  dir='rtl' className='text-gray-900 font-medium'>
            {/* {moment(currentOrder.date).locale('fa').format('YYYY/MM/DD')} */}
            {currentOrder.phone}
          </span>
        </div>

        <div>
          <span className='text-gray-500'>کد پستی مشتری: &nbsp;</span>
          <span  dir='rtl' className='text-gray-900 font-medium'>
            {/* {moment(currentOrder.date).locale('fa').format('YYYY/MM/DD')} */}
            {order.order_address?.postal_code}
          </span>
        </div>
      </div>
      
      {/* Payment Details */}

      {/* Address Details */}
      <hr className='my-7' />
      <div>
        <label htmlFor='address' className='block mb-2 text-gray-500'>
          آدرس
        </label>
        <textarea
          name='address'
          id='address'
          cols='30'
          rows='5'
          onChange={handleChange}
          value={currentOrder.address}
          className='w-full lg:max-w-md border rounded resize-none border-gray-200 py-2 px-3 text-gray-700 outline-none shadow-blue-200 focus:border-blue-600 focus:shadow-sm'
        ></textarea>
      </div>

      {/* Products Details */}
      <hr className='my-7' />
      <p className='block mb-2 text-gray-500'>محصولات خریداری شده</p>
      <Table
        header={header}
        items={currentOrder.products}
        handleEdit={openChangeProductModal}
        noDataText='محصولی برای نمایش وجود ندارد'
        // handleDelete={handleDeleteProduct}
      />
 <hr className='my-7' />
      <p className='block mb-2 text-gray-500'>روش ارسال محصولات</p>
      <input className='border border-gray-200' style={{width:'50%',height:'2.4rem', borderRadius:'8px'}}/>
      <hr className='my-7' />
      <div className='flex justify-end'>
        <button
          onClick={handleSave}
          type='button'
          disabled={isLoading}
          className={cn(
            'py-3 px-5 w-40 text-center justify-center whitespace-nowrap text-white bg-blue-500 rounded inline-flex items-center gap-1  hover:shadow-md hover:shadow-blue-300 transition duration-200',
            {
              ['bg-blue-300 pointer-events-none cursor-progress']: isLoading
            }
          )}
        >
          {isLoading ? (
            <span className='w-5 h-5 block mx-auto rounded-full border-4 border-blue-500 border-t-white animate-spin'>
              &nbsp;
            </span>
          ) : (
            <>
              <FaRegSave />
              <span>ذخیره تغییرات</span>
            </>
          )}
        </button>
      </div>

      {isChangeStatusOpen && (
        <OrderStatusModal
          isOpen={isChangeStatusOpen}
          closeModal={closeChangeStatusModal}
          handleSave={handleSaveStatus}
        />
      )}

      {isChangeProductOpen && (
        <EditProductModal
          isOpen={isChangeProductOpen}
          closeModal={closeChangeProductModal}
          handleSave={handleSaveProduct}
          currentPack={currentProduct.type}
          currentWeight={currentProduct.weight}
        />
      )}

      <ToastContainer />
    </div>
  );
}

// EditOrder.defaultProps = {
//   order: {
//     id: '123456',
//     customer: 'احمدرضا معینی',
//     price: '500,000',
//     status: { id: 'unverified', name: 'در انتظار تایید' },
//     date: '1400/10/10',
//     address: 'تهران - سعادت آباد - بلوار دریا - خیابان سرو 5 - پلاک 20',
//     products: [
//       {
//         id: 'prd-001',
//         title: 'پسته',
//         type: '1000 گرمی',
//         weight: 1,
//         price: '200,000',
//         totalPrice: '200,000'
//       },
//       {
//         id: 'prd-002',
//         title: 'بادام هندی',
//         type: '500 گرمی',
//         weight: 1,
//         price: '300,000',
//         totalPrice: '300,000'
//       }
//     ]
//   }
// };
