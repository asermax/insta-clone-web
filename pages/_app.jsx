import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query-devtools';
import { theme } from '~/styles/theme';
import { GlobalStyles } from '~/styles/global';

// eslint-disable-next-line react/prop-types
const InstaCloneApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Component {...pageProps} />
    <ReactQueryDevtools />
  </ThemeProvider>
);

export default InstaCloneApp;
