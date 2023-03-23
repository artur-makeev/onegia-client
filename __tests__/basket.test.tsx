import React from 'react';
import BasketPage from '../pages/basket';
import { render, screen, within } from '@testing-library/react';
import { mockBasket } from '../__mocks__/mockBasket';
import { useBasketStore } from '../modules/Basket';

describe('Basket page', () => {
	beforeEach(() => {
		useBasketStore.setState({ products: mockBasket });
	});

	it('render a page heading', () => {
		//	mockRouter.isReady;
		render(<BasketPage />);
		screen.getByRole('heading', { name: /Корзина/i });
	});

	it('renders corerect number of rows with basket products and correct total sum', () => {
		render(<BasketPage />);
		screen.getByText(/3250/i);
		const table_items = screen.getByRole('table', { name: /products/i });
		const { getAllByRole } = within(table_items);
		const tableItems = getAllByRole('row');
		expect(tableItems.length).toBe(2);
	});

	it('renders corerect information about products', () => {
		render(<BasketPage />);
		screen.getByText(/Твердые духи/i);
		screen.getByText(/Pride/i);
		screen.getByText(/450/i);
		screen.getByText(/Свеча 250 мл./i);
		screen.getByText(/Груша в карамели/i);
		screen.getByText(/1400/i);
	});
});
