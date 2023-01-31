import Head from 'next/head';
import { HTMLProps } from 'react';
import Navbar from '../NavBar/NavBar';
import BottomBar from '../BottomBar/BottomBar';

export default function Layout({ children }: HTMLProps<HTMLElement>) {

	return (
		<>
			<Head>
				<title>Onegia</title>
				<meta name="description" content="Ароматические свечи, твердые духи" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main>
				{children}
			</main>
			<BottomBar />
		</>
	);
}