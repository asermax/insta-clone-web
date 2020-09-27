import { useMutation, queryCache } from 'react-query';
import { destroy, post } from '~/data/api';

const toggleFollowUser = ({ username, following }) => (following
  ? destroy(`users/${username}/unfollow/`)
  : post(`users/${username}/follow/`)
);

export const useToggleFollow = () => useMutation(toggleFollowUser, {
  onSuccess: (_, { username }) => {
    const userQueryKey = ['users', { slug: username }];
    queryCache.setQueryData(userQueryKey, (old) => ({ ...old, following: !old.following }));
  },
});
