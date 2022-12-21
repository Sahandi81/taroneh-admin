import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import cn from 'classnames';

import { clearCredentials } from '@/features/admin/adminSlice';
import { useLogoutMutation } from '@/features/api/apiSlice';
import Spinner from '../ui/spinner';
import {
  FaUserTie,
  FaArrowRight,
  FaHome,
  FaShoppingBag,
  FaGrinStars,
  FaCartArrowDown,
  FaUsers,
  FaChartPie,
  FaSignOutAlt,
  FaList,
  FaBookOpen,
  FaComment
} from 'react-icons/fa';

export default function Sidebar({ items }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleClickExit = () => {
    logout()
      .unwrap()
      .then(data => {
        dispatch(clearCredentials());
        setTimeout(() => router.replace('/login'), 200);
      })
      .catch(error => {
        toast.error('Server Error' + error?.message);
      });
  };

  return (
    <aside className='w-full max-w-[18rem] fixed block top-0 bottom-0 z-10 bg-white shadow-sm overflow-y-auto pb-5'>
      <div className='relative flex items-center h-20 border-b pr-4 border-gray-200'>
        <Image src='/logo.png' alt='Taroneh' width={60} height={60} />
        <h1 className='text-gray-600 text-sm font-semibold mr-4 pt-2'>
          <span className='block'>ادمین طارونه</span>
          <span>admin@taroneh.ir</span>
        </h1>
        {/* <div className='absolute -left-3 cursor-pointer rounded-full bg-emerald-500 text-white p-1'>
          <FaArrowRight size={18} />
        </div> */}
      </div>
      <div className='flex gap-2 px-4 flex-col w-full mt-10'>
        {items.map(({ id, title, route, icon }) => (
          <Link key={id} href={route}>
            <a
              className={cn('flex items-center pr-5 gap-4 py-4 rounded', {
                [`text-white bg-emerald-400 shadow-md shadow-emerald-400/40`]:
                  router.pathname === route,
                [`text-gray-500 hover:bg-emerald-50 hover:text-emerald-500`]:
                  router.pathname !== route
              })}
            >
              {icon}
              {title}
            </a>
          </Link>
        ))}
        <div
          className='flex items-center pr-5 gap-4 py-4 text-rose-500 rounded hover:bg-rose-100 cursor-pointer'
          onClick={handleClickExit}
        >
          <FaSignOutAlt size={25} />
          خروج
        </div>
      </div>
      {isLoading && <Spinner variant='full' />}
      <ToastContainer />
    </aside>
  );
}

Sidebar.defaultProps = {
  items: [
    { id: 'home', title: 'خانه', route: '/', icon: <FaHome size={25} /> },
    {
      id: 'orders',
      title: 'سفارشات',
      route: '/orders',
      icon: <FaShoppingBag size={25} />
    },
    {
      id: 'categories',
      title: 'دسته بندی ها',
      route: '/categories',
      icon: <FaList size={25} />
    },
    {
      id: 'incredible-offers',
      title: 'پیشنهادات شگفت انگیز',
      route: '/incredible-offers',
      icon: <FaGrinStars size={25} />
    },
    // {
    //   id: 'special-sells',
    //   title: 'فروش ویژه',
    //   route: '/special-sells',
    //   icon: <FaGrinStars size={25} />
    // },
    {
      id: 'products',
      title: 'محصولات',
      route: '/products',
      icon: <FaCartArrowDown size={25} />
    },
    {
      id: 'customers',
      title: 'مشتری ها',
      route: '/customers',
      icon: <FaUsers size={25} />
    },
    {
      id: 'blog',
      title: 'بلاگ',
      route: '/blog',
      icon: <FaBookOpen size={25} />
    },
    {
      id: 'comments',
      title: 'نظرات',
      route: '/contact',
      icon: <FaComment size={25} />
    },
    {
      id: 'reports',
      title: 'کد تخفیف',
      route: '/DiscountCode',
      icon: <FaChartPie size={25} />
    }
  ]
};
