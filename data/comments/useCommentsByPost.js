import { useQuery } from 'react-query';
import { get } from '../api';

const getComments = (key, { post }) => {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = get(`${key}/?post=${post}`, { signal });
  promise.cancel = () => controller.abort();

  return promise;
};

export const useCommentsByPost = (post) => useQuery(
  ['comments', { post }],
  getComments,
  {
    enabled: post != null,
  },
);
