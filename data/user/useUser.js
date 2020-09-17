import { useQuery } from 'react-query';
import { get } from '../api';

const getUser = async (key, action) => {
  const response = await get(`${key}/${action}/`);

  if (response.id == null) {
    return null;
  }

  return response;
};

export const useUser = () => useQuery(['users', 'me'], getUser);
