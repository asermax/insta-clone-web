import { DateTime } from 'luxon';
import { useMutation, queryCache } from 'react-query';
import { post } from '~/data/api';

const FAKE_ID = 'fake_id';
const sendComment = (newComment) => post('comments/', newComment);

export const useSendComment = () => useMutation(sendComment, {
  onMutate: (newComment) => {
    const queryKey = ['comments', { post: newComment.post }];
    queryCache.cancelQueries(queryKey);

    const previousComments = queryCache.getQueryData(queryKey);
    const fakeComment = {
      id: FAKE_ID,
      user: '...',
      comment: newComment.comment,
      createDate: DateTime.local().toISO(),
    };
    queryCache.setQueryData(queryKey, (old) => [...old, fakeComment]);

    return () => queryCache.setQueryData(queryKey, previousComments);
  },
  onSuccess: ([createdComment], newComment) => {
    queryCache.setQueryData(['comments', { post: newComment.post }], (old) => [
      ...old.filter(({ id }) => id !== FAKE_ID),
      createdComment,
    ]);
  },
  onError: (_, __, rollback) => rollback(),
});
