import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function getOrders(req, res) {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { status, page, per_page } = req.query;

    const { token } = cookie.parse(req.headers.cookie);
    console.log( token, status, page, per_page, req.query)
    const backendRes = await fetch(
      `${API_URL}/api/admin/orders?${status && status !== ''?'q='+status+'&':''}page=${page}&per_page=${per_page}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    const data = await backendRes.json();
     console.log(data, token, status, page, per_page)
      
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({
          message: data.message || 'Error in editing order!',
          errors: data.errors
        });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
