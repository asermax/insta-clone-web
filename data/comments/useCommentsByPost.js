import { useQuery } from 'react-query';
import { get } from '../api';

const getComments = (key, { post }) => get(`${key}/?post=${post}`);

export const useCommentsByPost = (post) => useQuery(
  ['comments', { post }],
  getComments,
  {
    enabled: post != null,
  },
);
