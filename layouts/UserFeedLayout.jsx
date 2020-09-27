import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePostsByUser } from '~/data/posts';
import { DefaultLayout } from '~/layouts';
import { CommentIcon, LikeIcon, FollowButton } from '~/components';

const UserSection = styled.section`
  display: flex;
  flex-direction: row;
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

const Overlay = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: 700;

  div {
    display: flex;
    align-items: center;
  }

  div + div {
    margin-left: 1rem;
  }
`;

const Post = styled.a`
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover ${Overlay} {
    display: flex;
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
        &nbsp;&nbsp;-&nbsp;&nbsp;
        <FollowButton />
      </UserSection>
      <PostsSection>
        {posts != null ? posts.map(({
          id,
          images: [firstImage],
          likesCount,
          commentsCount,
        }) => (
          <Link
            key={id}
            href="/[user]/[post]"
            as={`/${router.query.user}/${id}`}
            passHref
          >
            <Post>
              <img src={firstImage.file} alt={firstImage.description} />
              <Overlay>
                <div>
                  <LikeIcon color="white" filled />
                  &nbsp;
                  &nbsp;
                  {likesCount}
                </div>
                <div>
                  <CommentIcon color="white" filled />
                  &nbsp;
                  &nbsp;
                  {commentsCount}
                </div>
              </Overlay>
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
