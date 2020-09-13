import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 700;
`;

export const UserLink = ({ username }) => (
  <Link href="/[user]" as={`/${username}`} passHref>
    <Container>
      {username}
    </Container>
  </Link>
);

UserLink.propTypes = {
  username: PropTypes.string.isRequired,
};
