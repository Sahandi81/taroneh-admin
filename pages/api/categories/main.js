import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function categories(req, res) {
  if (req.method === 'GET') {
    const { page, per_page } = req.query;

    const backendRes = await fetch(`${API_URL}/api/categories?page=${page}&per_page=${8}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const data = await backendRes.json();
    console.log(data)
    if (backendRes.ok) {
      res.status(200).json({ data:data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Error in getting categories!', errors: data.errors });
    }
  } else if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const { name, photos } = req.body;

    const backendRes = await fetch(`${API_URL}/api/admin/add_category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, photos })
    });

    const data = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ ...data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.msg || 'Server error!' });
    }
  } else if (req.method === 'PUT') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const { id, name, active ,photos} = req.body;

    const backendRes = await fetch(`${API_URL}/api/admin/update_category`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, name, active,photos })
    });

    const data = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ ...data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Server error!' });
    }
  } else if (req.method === 'DELETE') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const { id } = req.body;

    const backendRes = await fetch(`${API_URL}/api/admin/delete_category`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    });

    const data = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ ...data });
    } else {
      res
        .status(backendRes.status)
        .json({ message: data.message || 'Server error!' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
