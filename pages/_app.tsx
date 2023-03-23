import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';

import createEmotionCache from '../utilities/createEmotionCache';
import { themeOptions } from '../styles/theme/theme';
import '../styles/globals.css';

import { useEffect } from 'react';
import { Inter } from '@next/font/google';

import { NavBar, BottomBar } from '../modules/Layout/';
import Head from 'next/head';

import { useBasketStore } from '../modules/Basket/store/BasketStore';
import WithYandexMetrika from '../Providers/WithYandexMetrika';

interface AppPropsExtended extends AppProps {
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme(themeOptions);

const inter = Inter({
	subsets: ['cyrillic', 'latin'],
});

const App: React.FunctionComponent<AppPropsExtended> = (props) => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const setBasketProducts = useBasketStore((state) => state.setProducts);
	const setBasketLoaded = useBasketStore((state) => state.setLoaded);

	useEffect(() => {
		const savedProducts = localStorage.getItem('products');
		if (savedProducts !== null) {
			setBasketProducts(JSON.parse(localStorage.getItem('products') || ''));
		}
		setBasketLoaded(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<Head>
					<title>Onegia</title>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<link rel='preconnect' href='https://mc.yandex.ru' />
				</Head>
				<WithYandexMetrika>
					<div className={inter.className}>
						<NavBar />
						<Component {...pageProps} />
						<BottomBar />
					</div>
				</WithYandexMetrika>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default App;
