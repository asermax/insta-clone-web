import cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const get = async (path) => {
  const response = await fetch(`${API_URL}/${path}`);
  const data = await response.json();

  return data;
};
