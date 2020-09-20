import { useMutation, queryCache } from 'react-query';
import { post } from '~/data/api';

const createPost = async ({ text, images }) => {
  const serializedPost = {
    text,
    images: await Promise.all(images.map((image) => new Promise((success) => {
      const reader = new FileReader();
      reader.onloadend = () => success({
        description: image.name,
        file: reader.result,
      });
      reader.readAsDataURL(image);
    }))),
  };

  return post('posts/', serializedPost);
};

export const useCreatePost = () => useMutation(createPost, {
  onSuccess: () => queryCache.invalidateQueries('posts'),
});
