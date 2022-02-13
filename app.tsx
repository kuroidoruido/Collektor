import React, { FC, useMemo } from 'react'

import { LOGO } from '~/lib/logo.ts';

import 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';
import 'https://fonts.googleapis.com/icon?family=Material+Icons';

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  const favicon = useMemo(() => `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${LOGO}</text></svg>`, []);
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="./style/index.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <link rel="icon" href={favicon}></link>
      </head>
      <Page {...pageProps} />
    </main>
  )
}
