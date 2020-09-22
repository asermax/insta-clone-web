import { useMutation, queryCache } from 'react-query';
import { post } from '~/data/api';

const likePost = ({ post: likedPost }) => post('likes/', { post: likedPost });

export const useLikePost = () => useMutation(likePost, {
  onMutate: (postLike) => {
    const postQueryKey = ['posts', { id: postLike.post }];
    const likeQueryKey = ['likes', postLike];
    queryCache.cancelQueries(postQueryKey);
    queryCache.cancelQueries(likeQueryKey);

    const previousPost = queryCache.getQueryData(postQueryKey);
    queryCache.setQueryData(postQueryKey, (old) => ({ ...old, likesCount: old.likesCount + 1 }));
    queryCache.setQueryData(likeQueryKey, [postLike]);

    return () => {
      queryCache.setQueryData(postQueryKey, previousPost);
      queryCache.setQueryData(likeQueryKey, []);
    };
  },
  onSuccess: ([createdPostLike], postLike) => {
    queryCache.setQueryData(['likes', postLike], [createdPostLike]);
  },
  onError: (_, __, rollback) => rollback(),
});
