import { useQuery } from 'react-query';
import { get } from '../api';

const getPosts = (key, { username }) => get(`${key}/?username=${username}`);

export const usePostsByUser = (username) => useQuery(
  ['posts', { username }],
  getPosts,
  {
    enabled: username != null,
  },
);
