import cookie from 'js-cookie';
import camelcaseKeys from 'camelcase-keys';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_HEADERS = {
  'content-type': 'application/json',
};

const generateUrl = (path) => `${API_URL}/${path}`;

export const get = async (path) => {
  const response = await fetch(generateUrl(path));
  const data = await response.json();

  return camelcaseKeys(data);
};

export const post = async (path, body) => {
  const response = await fetch(generateUrl(path), {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
  });
  const data = await response.json();

  return [camelcaseKeys(data), response.status];
};
