import { useQuery } from 'react-query';
import { get } from '../api';

const getPost = (key, { id }) => get(`${key}/${id}/`);

export const usePostById = (id) => useQuery(
  ['posts', { id }],
  getPost,
  {
    enabled: id != null,
  },
);
