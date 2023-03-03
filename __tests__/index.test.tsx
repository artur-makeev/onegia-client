import React from 'react';
import HomePage from '../pages';
import { render, screen } from '@testing-library/react';


describe('Home page', () => {
	it('render a slide heading', () => {
		render(
			<HomePage />
		);
		screen.getByRole('heading', { name: /Cвечи/i });
	});
});