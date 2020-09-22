import { useMutation, queryCache } from 'react-query';
import { destroy } from '~/data/api';

const unlikePost = ({ id }) => destroy(`likes/${id}/`);

export const useUnlikePost = () => useMutation(unlikePost, {
  onMutate: (postLike) => {
    const postQueryKey = ['posts', { id: postLike.post }];
    const likeQueryKey = ['likes', { post: postLike.post, user: postLike.user }];
    queryCache.cancelQueries(postQueryKey);
    queryCache.cancelQueries(likeQueryKey);

    const previousPost = queryCache.getQueryData(postQueryKey);
    const previousLike = queryCache.getQueryData(likeQueryKey);
    queryCache.setQueryData(postQueryKey, (old) => ({ ...old, likesCount: old.likesCount - 1 }));
    queryCache.setQueryData(likeQueryKey, []);

    return () => {
      queryCache.setQueryData(postQueryKey, previousPost);
      queryCache.setQueryData(likeQueryKey, [previousLike]);
    };
  },
  onError: (_, __, rollback) => rollback(),
});
