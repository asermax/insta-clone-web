import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import TextareaAutosize from 'react-autosize-textarea';
import { useUser } from '~/data/user';
import { useCreatePost } from '~/data/posts';
import { DefaultLayout } from '~/layouts';
import { Button } from '~/components';

const Container = styled(DefaultLayout)`
  display: flex;
  flex-direction: row;
`;

const Images = styled.div`
  width: 50%;
  margin-right: 0.5rem;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, 9.5rem);
`;

const Image = styled.img`
  width: 9.5rem;
  height: 9.5rem;
  object-fit: cover;
`;

const UploadImage = styled.button`
  width: 9.5rem;
  height: 9.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.25rem dashed #dbdbdb;
  background: none;
  color: #dbdbdb;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 0.5rem;

  textarea {
    width: 100%;
    padding: 0.5rem;
    resize: none;
    border: none;
    border-radius: 0.5rem;
    font-family: inherit;

    &::placeholder {
      color: #cbcbcb;
    }
  }
`;

const CreatePostButton = styled(Button).attrs(() => ({
  type: 'submit',
}))`
  margin-top: 1rem;
  align-self: flex-end;
`;

const CreatePost = () => {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useUser();
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [createPost] = useCreatePost();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDropAccepted: (acceptedFiles) => {
      setImages((oldFiles) => [
        ...oldFiles,
        ...acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      ]);
    },
  });

  const onCreate = useCallback(() => createPost(
    {
      text,
      images,
    },
    {
      onSuccess: () => router.push('/[user]', `/${user.username}`),
    },
  ), [text, images, createPost, user, router]);

  useEffect(() => {
    if (!userLoading && user == null) {
      router.push('/login');
    }
  }, [userLoading, user, router]);

  return (
    <Container>
      <Images>
        {images.map(({ path, preview }) => (
          <Image src={preview} alt={path} key={path} />
        ))}
        <UploadImage {...getRootProps()}>
          <input {...getInputProps()} />
          Subir
          <br />
          imagen
        </UploadImage>
      </Images>
      <Description>
        <TextareaAutosize
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
          placeholder="Escribe una descripción para tu post..."
        />
        <CreatePostButton
          disabled={images.length === 0 || text.trim() === ''}
          onClick={onCreate}
        >
          Crear post
        </CreatePostButton>
      </Description>
    </Container>
  );
};

export default CreatePost;
