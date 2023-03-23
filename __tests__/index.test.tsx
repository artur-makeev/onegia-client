import React from 'react';
import HomePage from '../pages';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { slidesData, useSliderStore } from '../modules/Slider';

describe('Home page', () => {
	it('render a slide heading', () => {
		render(<HomePage />);
		expect(screen.getByRole('heading', { name: /Cвечи/i })).toBeInTheDocument();
	});

	it('renders slider buttons', () => {
		render(<HomePage />);
		const catalogButtons = screen.queryAllByRole('button', {
			name: /Каталог/i,
		});
		expect(catalogButtons).toHaveLength(slidesData.length);

		catalogButtons.forEach((button) => {
			expect(button).toBeInTheDocument();
		});
	});
});

describe('Slider', () => {
	beforeEach(() => {
		useSliderStore.setState({ slideIndex: 0 });
	});

	it('correctly changes slide index state when pressing arrow buttons', () => {
		const { result } = renderHook(() =>
			useSliderStore((state) => state.slideIndex)
		);

		render(<HomePage />);

		const buttonsRight = screen.getAllByTestId('right slide');
		const buttonsLeft = screen.getAllByTestId('left slide');

		for (let i = 0; i < slidesData.length; i++) {
			fireEvent.click(buttonsRight[i]);

			if (i === slidesData.length - 1) {
				expect(result.current).toBe(0);
			} else {
				expect(result.current).toBe(i + 1);
			}
		}

		fireEvent.click(buttonsLeft[0]);
		expect(result.current).toBe(slidesData.length - 1);
	});

	it('sets correct alt text for slide images', () => {
		render(<HomePage />);
		const images = screen.getAllByRole('img');

		images.forEach((image, index) => {
			const slide = slidesData[index];
			expect(image).toHaveAttribute('alt', slide.title);
		});
	});
});
