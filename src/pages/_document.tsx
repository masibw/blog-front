import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

type Props = { unknown };

class Document extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
