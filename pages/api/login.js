import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function login(req, res) {
  
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    let bodyData = {};
    // console.log(API_URL, username, password)
    if (username.includes('@')) {
      bodyData = { email: username, password };
    } else {
      bodyData = { phone: username, password };
    }

    const backendRes = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });

    const data = await backendRes.json();

    console.log(data);
    if (backendRes.ok) {
      // Set cookie
      await res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/'
        })
      );

      res.status(200).json({ data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Invalid credentials!' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
