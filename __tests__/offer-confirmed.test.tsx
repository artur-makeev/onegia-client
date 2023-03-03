import React from 'react';
import OrderConfirmationPage from '../pages/order-confirmed';
import { render, screen } from '@testing-library/react';
//import mockRouter from 'next-router-mock';

//jest.mock('next/router', () => require('next-router-mock'));
describe('Order confirmed page', () => {
	it('render a page heading', () => {
		//	mockRouter.isReady;
		render(<OrderConfirmationPage />);
		screen.getByRole('link', { name: /Каталог/i });
	});
});