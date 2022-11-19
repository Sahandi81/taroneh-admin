import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async function categories(req, res) {
    if (req.method === 'GET') {
      
      const backendRes = await fetch(`${API_URL}/api/subcategories?page=${req.query.page}&per_page=${req.query.per_page}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await backendRes.json();

      if (backendRes.ok) {
        res.status(200).json({ data });
      } else {
        res
          .status(backendRes.status)
          .json({ message: data.msg || 'Error in getting subcategories!' });
      }
    } else if (req.method === 'POST') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not authorized!' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const { name, category_id, photos } = req.body;

    const backendRes = await fetch(`${API_URL}/api/admin/add_subcategory`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, category_id, photos })
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

    const { id, name, active, category_id, photos } = req.body;

    const backendRes = await fetch(`${API_URL}/api/admin/update_subcategory`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, name, active, category_id, photos })
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

    const backendRes = await fetch(`${API_URL}/api/admin/delete_subcategory`, {
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
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
