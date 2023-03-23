import React from 'react';
import OrderConfirmationPage from '../pages/order-confirmed';
import { render, screen } from '@testing-library/react';

describe('Order confirmed page', () => {
	it('render a page heading', () => {
		render(<OrderConfirmationPage />);
		screen.getByRole('link', { name: /Каталог/i });
	});
});
