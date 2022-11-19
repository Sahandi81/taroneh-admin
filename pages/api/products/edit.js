import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function addProduct(req, res) {
  if (req.method === 'PATCH') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const product = req.body;

    const tempProduct = {
      id: product.id,
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
      photos: product.photos
    }

    const backendRes = await fetch(`${API_URL}/api/admin/update_product`, {
      method: 'PATCH',
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
        .json({ message: data.message || 'Error in editing new product!', errors: data.errors });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
