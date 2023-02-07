import React from 'react';
import HomePage from '../pages';
import { render, screen } from '@testing-library/react';
import slidesData from '../components/Slider/slidesData';

describe('Home page', () => {
	it('render a slide heading', () => {
		render(<HomePage slides={slidesData} />);
		screen.getByRole('heading', { name: /Cвечи/i });
	});

});