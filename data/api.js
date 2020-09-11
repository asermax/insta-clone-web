import cookie from 'js-cookie';
import camelcaseKeys from 'camelcase-keys';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const generateUrl = (path) => `${API_URL}/${path}`;
const generateHeaders = () => ({
  'content-type': 'application/json',
  'x-csrftoken': cookie.get('csrftoken'),
});

export const get = async (path) => {
  const response = await fetch(generateUrl(path), {
    credentials: 'include',
    headers: generateHeaders(),
  });
  const data = await response.json();

  return camelcaseKeys(data);
};

export const post = async (path, body) => {
  const response = await fetch(generateUrl(path), {
    method: 'POST',
    headers: generateHeaders(),
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return [camelcaseKeys(data), response.status];
};
