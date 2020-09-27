import { useQuery } from 'react-query';
import { get } from '../api';

const getUser = async (key, { slug }) => {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = get(`${key}/${slug}/`, { signal });
  promise.cancel = () => controller.abort();

  return promise;
};

export const useUserBySlug = (slug) => useQuery(
  ['users', { slug }],
  getUser,
  {
    enabled: slug != null,
  },
);
