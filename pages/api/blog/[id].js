import { API_URL } from '@/config/index';

export default async function blog(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        console.log(id, 'id')
        const backendRes = await fetch(
            `${API_URL}/api/blog/${id}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await backendRes.json();
            console.log(data)
        if (backendRes.ok) {
            res.status(200).json({ data });
        } else {
            res
                .status(backendRes.status)
                .json({ message: data.msg || 'Error in getting post!' });
        }
    }else if(req.method === "PUT"){
        const { id } = req.query;
        const { title, body, photo } = req.body;

        const backendRes = await fetch(
            `${API_URL}/api/blog/${id}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    body,
                    photo
                })
            }
        );

        const data = await backendRes.json();

        if (backendRes.ok) {
            res.status(200).json({ data });
        } else {
            res
                .status(backendRes.status)
                .json({ message: data.msg || 'Error in updating post!' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
