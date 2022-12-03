import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';
// import moment from 'jalali-moment';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Table from '../ui/table';
import DeleteOrderModal from './delete-order-modal';
import { useDeleteUserMutation, useGetCotactQuery, useGetOrdersQuery, useGetUsersQuery } from '@/features/api/apiSlice';
import thousandSeparator from '@/libs/thousandSeparator';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { calender } from '@/data/calender';

export default function Orders({ header,header2,header3 }) {
  const [order, setOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [lastPage, setLastPage] = useState(1);
  const [status, setStatus] = useState('paid')
  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  
  const router = useRouter();
  // console.log(router.pathname)
  // useEffect(())
  let selectFunc;
  let selectHeader;
  
  console.log(router.pathname)
    switch(router.pathname){
      case '/customers':
        selectFunc = useGetUsersQuery(page, perPage);
        selectHeader = header2
        break;
      case '/orders':
        selectFunc = useGetOrdersQuery({page, perPage, status});
        selectHeader = header
        
        break;
      case '/contact':
        selectHeader = header3
        selectFunc = useGetCotactQuery();
        break
        default :
        selectHeader = header
        selectFunc = useGetOrdersQuery(page, perPage);
        break;
    }
  const { data, error, isLoading } = selectFunc;
  
    // useEffect(()=>{
    //   window.location.reload()
    // },[status])
  console.log(data, status)
  // console.log(data.details.data)
  let memoizedOrders = useMemo(() => {
    if (data) {
      if (data.success || data.status) {
        // return 
        if(router.pathname === '/customers'){
         return typeof data?.users === 'object' ? data?.users?.map(user=>({
           phone: user.phone,
           f_name: user.f_name?user.f_name + `${user.l_name?user.l_name:''}`:"وارد نشده",
          //  l_name: user.l_name?user.l_name:"وارد نشده",
           email: user.email?user.email:"وارد نشده",
          // updated_at: "2021-11-24T13:05:03.537000Z",
          id: user._id,
        })):[]
      }else if(router.pathname === '/contact'){
        console.log("vali")
        return data?.details?.data.map(cont => ({
          phone: cont.mobile,
          name: cont.name ,
          customer: cont.type,
          message: cont.body ,
          date: calender(cont.created_at)
          //  moment(order.created_at).locale('fa').format('YYYY/MM/DD')
        }))
      }else if(router.pathname === '/orders') {

        return data.orders.map(order => ({
          id: order._id,
          code: `#${order.code}`,
          customer: `${ order.f_name?user.f_name:"وارد نشده"} ${order.l_name?user.l_name:""}`,
          price: thousandSeparator(order.final_price),
          status: order.condition,
          date: calender(order.created_at)
          //  moment(order.created_at).locale('fa').format('YYYY/MM/DD')
        }))
      }
      }
    }

    return [];
  }, [data, router.pathname]);
  // console.log(data.users.map(user=>({
  //   email: user.email,
  //   f_name: user.f_name?user.f_name:"وارد نشده",
  //   l_name: user.l_name?user.l_name:"وارد نشده",
  //   phone: user.phone,
  //   // updated_at: "2021-11-24T13:05:03.537000Z",
  //   id: user._id,
  // })))
  // if(router.pathname === '/customer'){
  //   memoizedOrders = data.users.map(user=>({
  //     email: user.email,
  //     f_name: user.f_name?user.f_name:"وارد نشده",
  //     l_name: user.l_name?user.l_name:"وارد نشده",
  //     phone: user.phone,
  //     // updated_at: "2021-11-24T13:05:03.537000Z",
  //     id: user._id,
  //   }))
  // }
  useEffect(() => {
    if (data) {
      if (data.success) {
        setLastPage(data.lastPage);
      }
    }
  }, [data]);

  // if (isLoading) {
  //   return <div>...Loading</div>;
  // }

  // if (error) {
  //   return <div>ERROR</div>;
  // }
  console.log(memoizedOrders)
  const handleClickPrev = () => {
    setPage(prevState => {
      if (prevState > 1) return prevState - 1;
    });
  };

  const handleClickNext = () => {
    setPage(prevState => {
      if (prevState < lastPage) return prevState + 1;
    });
  };

  const handleEditOrder = item => {
    router.push(`/orders/edit?id=${item.id}`);
  };

  const closeModal = () => setOpenDeleteOrderModal(false);
  const openModel = order => {
    setOrder(order);
    setOpenDeleteOrderModal(true);
  };

  const handleDeleteOrder = () => {
    if(router.pathname === "/customers"){
      
    deleteUser(order.id).unwrap().then(res=>toast.success(res.msg)).
    catch(er=>toast.error(er.msg));
  }
    closeModal();
  };

  const statusHandller =(e)=>{
    setStatus(e.target.value)
  }
  // { id: 'unverified', name: 'در انتظار تایید' },
  // { id: 'verified', name: 'آماده سازی سفارش' },
  // { id: 'posted', name: 'تحویل به مامور ارسال' },
  // { id: 'delivered', name: 'تحویل مرسوله به مشتری' }
  return (
    <div className='flex flex-col flex-1 p-6 bg-white rounded-lg shadow-lg shadow-slate-400/10'>
      <h1 className='text-lg font-semibold text-gray-700 mb-5'>{router.pathname === "/customers"?"لیست مشتری ها":"لیست سفارشات"}</h1>
      {window.location.pathname === '/orders' && <select 
        style={{width:'10rem' ,height:'2.5rem', margin:'1rem', fontSize:'1rem', borderRadius:'8px',boxShadow:'0 3px 4px #111'}}
        onClick={statusHandller}>
                <option value="paid">پرداخت شده ها</option>
                <option value="unpaid">پرداخت نشده ها</option>
                <option value="failed">انجام نشده ها</option>
                <option value="">همه</option>

            </select>}
      <Table
        header={selectHeader}
        items={memoizedOrders}
        handleEdit={handleEditOrder}
        handleDelete={openModel}
        isLoading={isLoading}
        noDataText={router.pathname !== "/customers"?"کاربری برای نمایش وجود ندارد":'سفارشی برای نمایش وجود ندارد'}
        route={router.pathname}
      />
      <div className='flex mr-auto w-fit mt-5 h-11 rounded border'>
        <button
          type='button'
          onClick={handleClickPrev}
          className={cn('w-11 flex justify-center items-center border-l', {
            ['text-gray-700']: page !== 1,
            ['text-gray-300']: page === 1,
            ['hover:bg-gray-100']: page !== 1,
            ['active:bg-transparent']: page !== 1
          })}
          disabled={page === 1}
        >
          <FaChevronRight />
        </button>
        <button
          type='button'
          onClick={handleClickNext}
          className={cn('w-11 flex justify-center items-center', {
            ['text-gray-700']: page !== lastPage,
            ['text-gray-300']: page === lastPage,
            ['hover:bg-gray-100']: page !== lastPage,
            ['active:bg-transparent']: page !== lastPage
          })}
          disabled={page === lastPage}
        >
          <FaChevronLeft />
        </button>
      </div>

      {openDeleteOrderModal && (
        <DeleteOrderModal
          isOpen={openDeleteOrderModal}
          closeModal={closeModal}
          deleteOrder={handleDeleteOrder}
        />
      )}
      <ToastContainer/>
    </div>
  );
}

Orders.defaultProps = {
  header: ['شماره سفارش', 'مشتری', 'مبلغ (تومان)', 'وضعیت', 'تاریخ', 'عملیات']
  ,header2: [ 'شماره', 'نام', 'ایمیل', 'عملیات'],
  header3:['شماره','نام','بخش','پیام','تاریخ' ]
};

