import React from 'react';
import FailPage from '../pages/fail';
import { render, screen } from '@testing-library/react';

describe('Payment fail page', () => {
	it('render a page heading', () => {
		render(<FailPage />);
		screen.getByRole('heading', { name: /Оплата не прошла/i });
	});
});