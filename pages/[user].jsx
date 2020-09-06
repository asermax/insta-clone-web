import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { DefaultLayout } from '~/layouts';
import { usePostsByUser } from '~/data/posts';

const UserSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostsSection = styled.section`
  display: grid;
  grid-gap: 1.75rem;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 3rem;
  border-top: 0.0625rem solid #dbdbdb;
`;

const Post = styled.article`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const User = () => {
  const router = useRouter();
  const { data: posts } = usePostsByUser(router.query.user);

  return (
    <DefaultLayout>
      <UserSection>
        <h1>
          {router.query.user}
        </h1>
      </UserSection>
      <PostsSection>
        {posts != null ? posts.map(({ id, images: [firstImage] }) => (
          <Post key={id}>
            <img src={firstImage.file} alt={firstImage.description} />
          </Post>
        )) : null}
      </PostsSection>
    </DefaultLayout>
  );
};

export default User;
