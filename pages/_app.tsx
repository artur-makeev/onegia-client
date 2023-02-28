import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import createEmotionCache from '../utilities/createEmotionCache';
import { themeOptions } from '../styles/theme/theme';
import '../styles/globals.css';

import { createContext, useEffect } from 'react';
import { ProductStore } from '../modules/ShopFront/store/ProductStore';
import { BasketStore } from '../modules/Basket';
import { SlideStore } from '../modules/Slider/store/SlideStore';
import { OrderStore } from '../modules/Order/store/OrderStore';
import { Inter } from '@next/font/google';
import { YMaps } from '@pbe/react-yandex-maps';

import { NavBar, BottomBar } from '../modules/Layout/';
import Head from 'next/head';

interface AppPropsExtended extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme(themeOptions);

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
});

const product = new ProductStore();
const basket = new BasketStore();
const slide = new SlideStore();
const order = new OrderStore();

export const Context = createContext({
  product,
  basket,
  slide,
  order
});

const App: React.FunctionComponent<AppPropsExtended> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts !== null) {
      basket.setProducts(JSON.parse(localStorage.getItem('products') || ''));
    }
    basket.setLoaded(true);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Context.Provider value={{
          product,
          basket,
          slide,
          order
        }}>
          <YMaps>
            <Head>
              <title>Onegia</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="preconnect" href="https://mc.yandex.ru" />
            </Head>
            <div className={inter.className}>
              <NavBar />
              <Component {...pageProps} />
              <BottomBar />
            </div>
          </YMaps>
        </Context.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
