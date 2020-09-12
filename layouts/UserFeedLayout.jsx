import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
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

const Post = styled.a`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserFeedLayout = ({ children }) => {
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
          <Link
            key={id}
            href="/[user]/[post]"
            as={`/${router.query.user}/${id}`}
            passHref
          >
            <Post>
              <img src={firstImage.file} alt={firstImage.description} />
            </Post>
          </Link>
        )) : null}
      </PostsSection>
      {children}
    </DefaultLayout>
  );
};

UserFeedLayout.propTypes = {
  children: PropTypes.node,
};

UserFeedLayout.defaultProps = {
  children: null,
};
