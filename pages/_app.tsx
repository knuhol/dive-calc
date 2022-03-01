// credits: https://github.com/mui/material-ui/blob/2a81d58c7b9e10718474639dc613078050e512b9/examples/nextjs/pages/_app.js
import * as React from 'react';
import Head from 'next/head';
import { AppProps as NextAppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';

import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { AppProvider } from '../src/AppContext';

const clientSideEmotionCache = createEmotionCache();

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
