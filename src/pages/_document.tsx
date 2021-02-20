import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import { GA_TRACKING_ID } from '../lib/gtag';

type Props = { unknown };

class Document extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
