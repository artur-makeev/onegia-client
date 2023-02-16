import React from 'react';
import ShopPage from '../pages/shop';
import { render, screen, within } from '@testing-library/react';
import { mockProducts } from '../__mocks__/mockProducts';
import { Context } from '../pages/_app';
import { ProductStore } from '../modules/ShopFront';


describe('Shop page', () => {
	it('render a Shop Page heading', () => {
		render(<ShopPage products={mockProducts} />);
		screen.getByRole('img', { name: /Свеча 50 мл./i });
	});

	it('it renders products', () => {
		const products = new ProductStore;
		products.setProducts(mockProducts);
		render(
			// eslint-disable-next-line
			// @ts-ignore
			<Context.Provider value={{ products }}>
				<ShopPage products={products.products} />
			</Context.Provider>
		);
		const allProducts = screen.getByRole('list', { name: /products/i });
		const { getAllByRole } = within(allProducts);
		const listItems = getAllByRole('listitem');
		expect(listItems.length).toBe(mockProducts.length);
	});

});