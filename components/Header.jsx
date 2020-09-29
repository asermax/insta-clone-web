import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { BaseContainer } from './BaseContainer';

const Container = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 0.0625rem solid #dbdbdb;
  background-color: white;
  z-index: 100;
`;

const CreatePostLink = styled.a`
  text-decoration: none;
  color: #8b8b8b;
  font-size: 2rem;
  font-weight: 700;
  padding: 0 0.6rem;
  border: 0.0625rem solid #8b8b8b;
  border-radius: 0.5rem;
`;

const Content = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
`;

export const Header = () => (
  <Container>
    <Content>
      InstaClone
      <Link href="/create-post" passHref>
        <CreatePostLink>
          +
        </CreatePostLink>
      </Link>
    </Content>
  </Container>
);
