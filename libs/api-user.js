const Cookies = require('js-cookie');
/* eslint-disable import/no-anonymous-default-export */
// mock the user api
export default async (url) => {
  // sleep 500
  await new Promise(res => setTimeout(res, 500));
  // check if authorized
  
  if (Cookies.get('token')) {
    const bToken = Cookies.get('token');

    const backRes = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bToken}`
      }
    });

    const data = await backRes.json();

    if (backRes.ok) {
      return {
        email: data.email
      };
    }
  }

  // not authorized
  const error = new Error('Not authorized!');
  error.status = 403;
  throw error;
};
