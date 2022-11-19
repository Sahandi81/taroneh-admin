import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
import {
  FaChartBar,
  FaUserFriends,
  FaShoppingCart,
  FaDollarSign
} from 'react-icons/fa';
import Layout from '@/components/layout/layout';
import StatCard from '@/components/dashboard/stat-card';
import StatChart from '@/components/dashboard/stat-chart';
import TopProducts from '@/components/dashboard/top-products';
// import RecentOrders from '@/components/dashboard/recent-orders';
import {useGetDashboardQuery} from '@/features/api/apiSlice';

// import { selectAdmin } from '@/features/admin/adminSlice';
// import Spinner from '@/components/ui/spinner-full';

export default function Home({ cards }) {
  // const router = useRouter();
  // const admin = useSelector(selectAdmin);
  const {data} = useGetDashboardQuery()
  
  
  // if (!admin) {
  //   setTimeout(() => router.push('/login'), 200);
  //   return <Spinner />;
  // }
  const routers = useRouter();
  // console.log()
  // const { data, error, isLoading } =useGetUsersQuery(1, 1);
  // const { data, error, isLoading } =useGetUsersQuery(1, 1);
      // console.log(data.lastPage)
    let entresObjMonth ;
    if(data){
    // const entresObjDay = Object.entries(data?.details.users.day);
   entresObjMonth = Object.entries(data?.details.users.month);
  console.log(data,'uiguygtyf',entresObjMonth[entresObjMonth.length -1][1])
      cards[0].stats = data?.details.users.all_users;
      cards[1].stats = data?.details.users.today_registered
      cards[2].stats = data?.details.sales_total_map.today_sales
      cards[3].stats = entresObjMonth[ entresObjMonth.length - 1][1]
}
  return (
    <Layout>
      <div className='grid grid-cols-2 gap-9'>
        <div className='grid grid-cols-4 col-span-full gap-8'>
          {cards.map(card => (
            <StatCard key={card.id} {...card} />
          ))}
        </div>
        <div className='bg-white rounded shadow-lg shadow-slate-400/10 flex flex-col items-center p-6'>
          <h3 className='text-base font-semibold text-gray-800 mb-4 text-center'>
            محصولات پرفروش
          </h3>
          <div className='w-96 h-96'>
            {data&&<TopProducts data={data?.details.products_total_map}/>}
          </div>
        </div>
        <div className='bg-white rounded shadow-lg shadow-slate-400/10 flex flex-col items-center p-6 h-fit'>
          <h3 className='text-base font-semibold text-gray-800 mb-4 text-center'>
            آمار فروش
          </h3>
          {entresObjMonth &&<StatChart  data={Object.entries(data?.details.sales_total_map)}/>}
        </div>
        {/* <RecentOrders /> */}
      </div>
    </Layout>
  );
}
// export async function getServerSideProps({ query }) {

//   const data = await 


// }
Home.defaultProps = {
  cards: [
    {
      id: 'card-01',
      text: 'تعداد کل مشتریان',
      stats: '0',
      variant: 'v-1',
      icon: <FaChartBar color='white' size={40} />
    },
    {
      id: 'card-02',
      text: 'تعداد ثبت نامی های امروز',
      variant: 'v-2',
      stats: '0',
      icon: <FaUserFriends color='white' size={40} />
    },
    {
      id: 'card-03',
      text: 'تعداد سفارشات امروز',
      variant: 'v-3',
      stats: '0',
      icon: <FaShoppingCart color='white' size={40} />
    },
    {
      id: 'card-04',
      text: 'تعداد سفارشات این ماه',
      variant: 'v-4',
      stats: '0',
      icon: <FaDollarSign color='white' size={40} />
    }
  ]
};
