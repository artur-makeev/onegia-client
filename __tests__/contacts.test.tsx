import React from 'react';
import ContactsPage from '../pages/contacts';
import { render, screen } from '@testing-library/react';

describe('Contacts page', () => {
	it('render a page heading', () => {
		render(<ContactsPage />);
		screen.getByRole('heading', { name: /Контакты/i });
	});
});
