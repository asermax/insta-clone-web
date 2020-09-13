import cookie from 'js-cookie';
import camelcaseKeys from 'camelcase-keys';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const get = async (path) => {
  const response = await fetch(`${API_URL}/${path}`);
  const data = await response.json();

  return camelcaseKeys(data);
};
