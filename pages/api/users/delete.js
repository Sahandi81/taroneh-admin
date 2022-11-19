import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function getUsers(req, res) {
  if (req.method === 'DELETE') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const {  id } = req.body;

    let customURL = `${API_URL}/api/admin/delete_user?id=${id}`;
    
    // if (id) {
    //   customURL = `${API_URL}/api/admin/users?id=${id}`;
    // }
  
    const backendRes = await fetch(customURL, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await backendRes.json();
    
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
