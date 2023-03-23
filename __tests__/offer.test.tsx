import React from 'react';
import OfferPage from '../pages/offer';
import { render, screen } from '@testing-library/react';

describe('Payment Success page', () => {
	it('renders the PublicOffer component', () => {
		render(<OfferPage />);
		const publicOfferElement = screen.getByTestId('public-offer');
		expect(publicOfferElement).toBeInTheDocument();
	});

	it('render a page heading', () => {
		render(<OfferPage />);
		screen.getByRole('heading', { name: /ПУБЛИЧНАЯ ОФЕРТА/i });
	});
});
