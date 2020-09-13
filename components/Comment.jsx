import { DateTime } from 'luxon';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { UserLink } from './UserLink';

const Container = styled.div`
  padding: 0.5rem 0;
`;

const Time = styled.div`
  margin-top: 0.5rem;
  color: #cbcbcb;
  font-size: 0.85rem;
`;

export const Comment = ({ user, comment, createDate }) => (
  <Container>
    <UserLink username={user} />
    &nbsp;
    {comment}
    <Time>
      {DateTime.fromISO(createDate).toRelative({
        locale: 'es-AR',
        padding: 1000,
      })}
    </Time>
  </Container>
);

UserLink.propTypes = {
  username: PropTypes.string.isRequired,
};

Comment.propTypes = {
  user: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
};
