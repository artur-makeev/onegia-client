import React from 'react';
import ShopPage from '../pages/shop';
import { render, screen, within } from '@testing-library/react';
import { mockProducts } from '../__mocks__/mockProducts';


describe('Shop page', () => {
	it('render a Shop Page heading', () => {
		render(<ShopPage products={mockProducts} />);
		screen.getByRole('img', { name: /Свеча 50 мл./i });
	});

	it('it renders products', () => {
		const products = mockProducts;
		render(<ShopPage products={products} />);
		const allProducts = screen.getByRole('list', { name: /products/i });
		const { getAllByRole } = within(allProducts);
		const listItems = getAllByRole('listitem');
		expect(listItems.length).toBe(mockProducts.length);
	});
});