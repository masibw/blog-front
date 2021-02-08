import '../../styles/globals.css';
import React from 'react';
import { AppProps } from 'next/app';

// eslint-disable-next-line react/jsx-props-no-spreading
export default ({ Component, pageProps }: AppProps): JSX.Element => (
    // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);
