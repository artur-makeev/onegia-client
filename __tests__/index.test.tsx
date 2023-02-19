import React from 'react';
import HomePage from '../pages';
import { render, screen } from '@testing-library/react';
import { SlideStore } from '../modules/Slider';
import { Context } from '../pages/_app';

describe('Home page', () => {
	it('render a slide heading', () => {
		const slide = new SlideStore();
		render(
			// eslint-disable-next-line
			// @ts-ignore
			<Context.Provider value={{ slide }}>
				<HomePage />
			</Context.Provider>
		);
		screen.getByRole('heading', { name: /Cвечи/i });
	});
});