import Layout from '@/components/layout/layout';
import EditProduct from '@/components/products/edit-product';
import { API_URL } from '@/config/index';

export default function AddProductPage({ data }) {
  // console.log(data)
  return (
    <Layout>
      <EditProduct product={data} />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { productId } = query;

  const response = await fetch(`${API_URL}/api/shop/single_product?id=${productId}`);
  const data = await response.json();

  return {
    props: { data } // will be passed to the page component as props
  };
}
