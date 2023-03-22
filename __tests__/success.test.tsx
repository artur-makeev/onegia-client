import React from 'react';
import SuccessPage from '../pages/success';
import { render, screen } from '@testing-library/react';

describe('Payment Success page', () => {
	it('render a page heading', () => {
		render(<SuccessPage />);
		screen.getByRole('heading', { name: /Оплата прошла успешно/i });
	});

	it('displays success message when paymentSuccessful is true', () => {
		render(<SuccessPage />);
		const successMessage = screen.getByText('Оплата прошла успешно');
		expect(successMessage).toBeInTheDocument();
	});


});