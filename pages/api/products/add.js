import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function addProduct(req, res) {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }
    
    const { token } = cookie.parse(req.headers.cookie);

    const product = req.body;

    const tempProduct = {
      code: product.code,
      title: product.title,
      quantity: product.quantity,
      quality: product.quality,
      unit_measurement: product.unit,
      amount: product.amount,
      stars: product.rank,
      scores: product.scores,
      buyers: product.buyers,
      amazing_offer: product.amazingOffer,
      types: product.types,
      short_explanation: product.shortDesc,
      sub_category_id: product.subCategoryId,
      Description: product.longDesc,
      attributes: product.attributes,
      photos: product.photos,
      price:120000
    }
    // console.log(tempProduct.sub_category_id)
    const backendRes = await fetch(`${API_URL}/api/admin/add_product`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
         "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(tempProduct)
    });

    const data = await backendRes.json();
    
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Error in adding new product!', errors: data.errors });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
