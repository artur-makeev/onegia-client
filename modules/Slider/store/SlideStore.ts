import { create } from 'zustand';

interface SliderState {
	slideIndex: number,
	setSlideIndex: (slideIndex: number) => void,
}

export const useSliderStore = create<SliderState>()(
	(set) => ({
		slideIndex: 0,

		setSlideIndex: (slideIndex) => set(() => ({ slideIndex: slideIndex })),
	})
);