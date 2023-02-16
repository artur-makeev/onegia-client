import React from 'react';
import BasketPage from '../pages/basket';
import { render, screen, within } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { Context } from '../pages/_app';
import { mockBasket } from '../__mocks__/mockBasket';
import { BasketStore } from '../modules/Basket';

jest.mock('next/router', () => require('next-router-mock'));

describe('Basket page', () => {
	it('render a page heading', () => {
		mockRouter.isReady;
		render(<BasketPage />);
		screen.getByRole('heading', { name: /Корзина/i });
	});

	it('renders corerect number of rows with basket products and correct total sum', () => {
		const basket = new BasketStore();
		basket.setProducts(mockBasket);
		render(
			// eslint-disable-next-line
			// @ts-ignore
			<Context.Provider value={{ basket }}>
				<BasketPage />
			</Context.Provider >
		);
		screen.getByText(/3250/i);
		const table_items = screen.getByRole('table', { name: /products/i });
		const { getAllByRole } = within(table_items);
		const tableItems = getAllByRole('row');
		expect(tableItems.length).toBe(2);
	});

	it('renders corerect information about products', () => {
		const basket = new BasketStore();
		basket.setProducts(mockBasket);
		render(
			// eslint-disable-next-line
			// @ts-ignore
			<Context.Provider value={{ basket }}>
				<BasketPage />
			</Context.Provider >
		);
		screen.getByText(/Твердые духи/i);
		screen.getByText(/Pride/i);
		screen.getByText(/450/i);
		screen.getByText(/Свеча 250 мл./i);
		screen.getByText(/Груша в карамели/i);
		screen.getByText(/1400/i);
	});
});