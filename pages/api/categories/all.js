import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function categories(req, res) {
  console.log('vali mansouri')
  if (req.method === 'GET') {
    // const { page, per_page } = req.query;
    const backendRes = await fetch(`${API_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await backendRes.json();
    console.log(data)
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Error in getting categories!', errors: data.errors });
    }
  }  else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
