import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query-devtools';
import { theme } from '~/styles/theme';
import { GlobalStyles } from '~/styles/global';

/* eslint-disable react/prop-types */
const InstaCloneApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || (({ children }) => children);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
};

export default InstaCloneApp;
