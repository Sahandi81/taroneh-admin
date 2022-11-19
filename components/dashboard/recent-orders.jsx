import Table from '../ui/table';

export default function RecentOrders({header, items}) {
  return (
    <div className='p-6 mb-10 rounded overflow-hidden shadow-lg shadow-slate-400/10 bg-white col-span-full'>
      <h3 className='text-base text-gray-800 font-semibold mb-5'>سفارشات اخیر</h3>
      <Table header={header} items={items} noDataText='سفارشی برای نمایش وجود ندارد' />
    </div>
  );
}


RecentOrders.defaultProps = {
  header: ['شماره سفارش', 'مشتری', 'مبلغ (تومان)', 'وضعیت', 'تاریخ', 'عملیات'],
  items: [
    { id: 'order-01', no: '#123456', customer: 'احمدرضا معینی', price: '200,000', status: 'پرداخت شده', date: '1400/01/01' },
    { id: 'order-02', no: '#987456', customer: 'محمد اسماعیلی', price: '300,000', status: 'در انتظار پرداخت', date: '1400/01/01' },
    { id: 'order-03', no: '#123789', customer: 'علیرضا محمدی', price: '400,000', status: 'لغو شده', date: '1400/01/01' }
  ]
};