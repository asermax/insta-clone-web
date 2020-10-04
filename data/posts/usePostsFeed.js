import { useInfiniteQuery } from 'react-query';
import { get } from '../api';

const getPosts = (key, cursor = '') => get(
  `${key}/?feed=true&cursor=${cursor}`,
);

export const usePostsFeed = () => {
  const query = useInfiniteQuery(
    ['posts'],
    getPosts,
    {
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
