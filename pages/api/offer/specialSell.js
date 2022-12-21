import { API_URL } from '@/config/index';

export default async function getAmazingOffer(req, res) {
  if (req.method === 'GET') {

    const backendRes = await fetch(`${API_URL}/api/special_sales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const data = await backendRes.json();
      console.log(data)
    if (backendRes.ok) {
      res.status(200).json({ data: data });
    } else {
      res.status(backendRes.status).json({ message: data.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
