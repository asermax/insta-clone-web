import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from './BaseContainer';

const Container = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 0.0625rem solid #dbdbdb;
  background-color: white;
`;

const Content = styled(BaseContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3rem;
`;

export const Header = () => (
  <Container>
    <Content>
      InstaClone
    </Content>
  </Container>
);
