import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function Dashboard(req, res) {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    // const { page, per_page, id } = req.query;

    let customURL = `${API_URL}/api/admin/dashboard`;
    
    // if (id) {
    //   customURL = `${API_URL}/api/admin/users?id=${id}`;
    // }

    const backendRes = await fetch(customURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await backendRes.json();
    console.log(token);
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.msg || 'Error in getting users!' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
