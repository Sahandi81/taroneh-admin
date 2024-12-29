import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function updateMainOffer(req, res) {
  if (req.method === 'PUT') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    
    // const tempProduct = {
      
    // }
    // const formDt = new FormData();
    // formDt.append("code", offer.code);
    // formDt.append("expire", offer.expire);
    // formDt.append("precent", offer.precent);
    
    const backendRes = await fetch(`https://tapi.ydos.ir/api/admin/update_amazing_offer`, {
      method: "PUT",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req.body)
      
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
