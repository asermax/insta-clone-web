import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, BaseContainer } from '~/components';

const Content = styled(BaseContainer)`
  padding-top: 4rem;
`;

export const DefaultLayout = ({ className, children }) => (
  <>
    <Header />
    <Content className={className}>
      {children}
    </Content>
  </>
);

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DefaultLayout.defaultProps = {
  className: null,
};
