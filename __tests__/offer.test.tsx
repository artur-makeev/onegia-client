import React from 'react';
import OfferPage from '../pages/offer';
import { render, screen } from '@testing-library/react';

describe('Payment Success page', () => {
	it('render a page heading', () => {
		render(<OfferPage />);
		screen.getByRole('heading', { name: /ПУБЛИЧНАЯ ОФЕРТА/i });
	});
});