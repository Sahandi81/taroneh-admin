import cookie from 'cookie';
import EditOrder from '@/components/orders/edit-order';
import Layout from '@/components/layout/layout';
import { API_URL } from '@/config/index';

export default function OrdersPage({ order }) {
  return (
    <Layout>
      <EditOrder order={order} />
    </Layout>
  );
}

export async function getServerSideProps({ query, req }) {
  if (!req.headers.cookie) {
    return {
      notFound: true
    };
  }
  console.log(cookie.parse(req.headers.cookie).token)

  const { id } = query;
  const { token } = cookie.parse(req.headers.cookie);
  const response = await fetch(`${API_URL}/api/admin/orders/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (response.ok) {
    const data = await response.json();
    // console.log(data)

    if (data.success) {
      const order = data.details;
      return {
        props: {
          order: {
            id: order._id,
            code: order.code,
            customer: `${order.users.f_name} ${order.users.l_name}`,
            price: order.real,
            status: order.condition,
            date: order.created_at,
            address: order.address,
            users: order.users,
              order_address: order.order_address,
            products: order.products?.map((prd, idx) => ({
              id: prd.id?.concat(idx),
              title: prd.type?.name,
              type: prd.type?.package,
              weight: prd.type?.number,
              price: prd.type?.price,
              totalPrice: prd.type?.number * prd.type?.price,
              
            }))
          }
        }
      };
    } else {
      return {
        notFound: true
      };
    }
  } else {
    return {
      notFound: true
    };
  }
}
