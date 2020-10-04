import React, { useCallback } from 'react';
import styled from 'styled-components';
import { InView } from 'react-intersection-observer';
import { usePostsFeed } from '~/data/posts';
import { DefaultLayout } from '~/layouts';
import { Slider, UserLink } from '~/components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4rem;
`;

const Post = styled.article`
  height: 37.5rem;
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid #dbdbdb;
  border-radius: 0.1875rem;

  & + & {
    margin-top: 4rem;
  }
`;

const SliderWrapper = styled(Slider)`
  flex: 1;
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 0.0625rem solid #dbdbdb;
`;

const Home = () => {
  const { posts, fetchMore, canFetchMore } = usePostsFeed();
  const onIntersection = useCallback(
    (inView) => (inView && canFetchMore ? fetchMore() : null),
    [canFetchMore, fetchMore],
  );

  return (
    <Container>
      {posts ? posts.map(({ id, user, images }) => (
        <Post key={id}>
          <Header>
            <UserLink username={user} />
          </Header>
          <SliderWrapper images={images} />
        </Post>
      )) : null}
      <InView onChange={onIntersection} rootMargin="200px" />
    </Container>
  );
};

Home.Layout = DefaultLayout;

export default Home;
