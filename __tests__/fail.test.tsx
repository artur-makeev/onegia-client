import React from 'react';
import FailPage from '../pages/fail';
import { render, screen } from '@testing-library/react';

describe('Payment fail page', () => {
	it('render a page heading', () => {
		render(<FailPage />);
		screen.getByRole('heading', { name: /Оплата не прошла/i });
	});

	it('displays error message when paymentSuccessful is false', () => {
		render(<FailPage />);
		const errorMessage = screen.getByText('Оплата не прошла');
		expect(errorMessage).toBeInTheDocument();
	});
});
