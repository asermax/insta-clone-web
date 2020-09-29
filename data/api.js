import cookie from 'js-cookie';
import camelcaseKeys from 'camelcase-keys';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const generateUrl = (path) => `${API_URL}/${path}`;
const generateHeaders = () => ({
  'content-type': 'application/json',
  'x-csrftoken': cookie.get('csrftoken'),
});

export const get = async (path, options) => {
  const response = await fetch(generateUrl(path), {
    ...options,
    credentials: 'include',
    headers: generateHeaders(),
  });
  const data = await response.json();

  return camelcaseKeys(data, { deep: true });
};

export const post = async (path, body, options) => {
  const response = await fetch(generateUrl(path), {
    ...options,
    method: 'POST',
    headers: generateHeaders(),
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return [camelcaseKeys(data, { deep: true }), response.status];
};

export const destroy = async (path, options) => {
  const response = await fetch(generateUrl(path), {
    ...options,
    method: 'DELETE',
    headers: generateHeaders(),
    credentials: 'include',
  });

  return response.status;
};
