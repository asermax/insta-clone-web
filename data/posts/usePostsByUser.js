import { useInfiniteQuery } from 'react-query';
import { get } from '../api';

const getPosts = (key, { username }, cursor = '') => get(
  `${key}/?username=${username}&cursor=${cursor}`,
);

export const usePostsByUser = (username) => {
  const query = useInfiniteQuery(
    ['posts', { username }],
    getPosts,
    {
      enabled: username != null,
      getFetchMore: ({ next }) => (next != null ? next : false),
    },
  );
  const posts = query != null && query.data != null
    ? query.data.flatMap(({ results }) => results)
    : null;

  return {
    ...query,
    posts,
  };
};
