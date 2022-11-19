import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function deleteAmazingOffer(req, res) {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    

    const backendRes = await fetch(
      `${API_URL}/api/admin/delete_product_to_amazing_offer`,
      {
        method:"POST",
        headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({product_id: req.body})

      }
    );

    const data = await backendRes.json();

      console.log(data, {id: req.body})
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({
          message: data.message || 'Error in deleting product!',
          errors: data.errors
        });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
