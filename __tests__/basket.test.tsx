import React from 'react';
import BasketPage from '../pages/basket';
import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

describe('Basket page', () => {
	it('render a page heading', () => {
		mockRouter.isReady;
		render(<BasketPage />);
		screen.getByRole('heading', { name: /Корзина/i });
	});
});