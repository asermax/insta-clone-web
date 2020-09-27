import React from 'react';
import { useRouter } from 'next/router';
import { useUserBySlug, useToggleFollow } from '~/data/user';
import { Button } from './Button';

export const FollowButton = () => {
  const router = useRouter();
  const { data: user } = useUserBySlug(router.query.user);
  const [toggleFollow, { isLoading: togglingFollow }] = useToggleFollow();

  return user != null ? (
    <Button type="button" onClick={() => toggleFollow(user)}>
      {!togglingFollow && user.following ? 'Unfollow' : null}
      {!togglingFollow && !user.following ? 'Follow' : null}
      {togglingFollow ? '...' : null}
    </Button>
  ) : null;
};
