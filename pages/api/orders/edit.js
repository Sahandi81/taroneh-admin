import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function editOrder(req, res) {
  if (req.method === 'PATCH') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const order = req.body;
    
    const backendRes = await fetch(`${API_URL}/api/admin/update_order`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(order)
    });

    const data = await backendRes.json();
    
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res.status(backendRes.status).json({
        message: data.message || 'Error in editing order!',
        errors: data.errors
      });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
