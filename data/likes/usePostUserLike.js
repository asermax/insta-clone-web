import { useQuery } from 'react-query';
import { get } from '../api';
import { useUser } from '../user';

const getUserLike = (key, { post, user }) => {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = get(`${key}/?post=${post}&user=${user}`, { signal });
  promise.cancel = () => controller.abort();

  return promise;
};

export const usePostUserLike = (post) => {
  const { data: user } = useUser();

  return useQuery(
    ['likes', { post, user: user && user.id }],
    getUserLike,
    {
      enabled: user != null && post != null,
    },
  );
};
