import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function addOffer(req, res) {
  if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    // const offer ={
    //   id: req.body.id,
    //   expire: req.body.expire,
    //   percent: req.body.percent,
      
    // }
        
    // const tempProduct = {
      
    // }
    // const formDt = new FormData();
    // formDt.append("code", offer.code);
    // formDt.append("expire", offer.expire);
    // formDt.append("precent", offer.precent);
    
    const backendRes = await fetch(`${API_URL}/api/admin/add_offer`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req.body)
      
    });

    const data = await backendRes.json();
     
    console.log(data,"offer api", req.body)
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Error in adding new product!', errors: data.errors });
    }
  }else if(req.method === 'GET'){
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }
    
    const { token } = cookie.parse(req.headers.cookie);

    const backendRes = await fetch(`${API_URL}/api/admin/discount`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      // body: JSON.stringify(req.body)
      
    });

    const data = await backendRes.json();
     
    // console.log(data,"offer api", req.body)
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Error in adding new product!', errors: data.errors });
    }


  }else if(req.method === 'DELETE'){
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }
    
    const { token } = cookie.parse(req.headers.cookie);

    const backendRes = await fetch(`${API_URL}/api/admin/discount`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req.body)
      
    });

    const data = await backendRes.json();
     
    // console.log(data,"offer api", req.body)
    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Error in adding new product!', errors: data.errors });
    }


  }else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
