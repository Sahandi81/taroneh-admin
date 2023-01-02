import cookie from 'cookie';
import {API_URL} from '@/config/index';

export default async function upload(req, res) {
    if (req.method === 'POST') {
        if (!req.headers.cookie) {
            res.status(403).json({message: 'Not authorized!'});
            return;
        }

        const {token} = cookie.parse(req.headers.cookie);
        const reqBody = new URLSearchParams(req.body);


        const backendRes = await fetch(`${API_URL}/api/admin/upload_photo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
            body: reqBody
        });

        const data = await backendRes.json();
      console.log(data);
        if (backendRes.ok) {
            res.status(200).json({data});
        } else {
            res
                .status(backendRes.status)
                .json({message: data.message || 'Error in uploading photos!'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
}
