import { useQuery } from 'react-query';
import { get } from '../api';

const getPost = (key, { id }) => {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = get(`${key}/${id}/`, { signal });
  promise.cancel = () => controller.abort();

  return promise;
};

export const usePostById = (id) => useQuery(
  ['posts', { id }],
  getPost,
  {
    enabled: id != null,
  },
);
