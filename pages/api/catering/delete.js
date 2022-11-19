import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function catering(req, res) {
  if (req.method === 'DELETE') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    

    // const tempProduct = {
    //   product_id: req.body.id
    // }
   
    const backendRes = await fetch(`${API_URL}/api/admin/catering/${req.body.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      
    });

    const data = await backendRes.json();
  //  console.log(data)
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
