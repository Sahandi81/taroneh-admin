import { NEXT_URL } from '@/config/index';

export async function login(username, password) {
  const res = await fetch(`${NEXT_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  
  const data = await res.json();
  
  return data;
}
