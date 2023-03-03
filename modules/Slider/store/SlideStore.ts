import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SliderState {
	slideIndex: number,
	setSlideIndex: (slideIndex: number) => void,
}

export const useSliderStore = create<SliderState>()(
	devtools(
		persist(
			(set) => ({
				slideIndex: 0,

				setSlideIndex: (slideIndex) => set(() => ({ slideIndex: slideIndex })),
			}),
			{
				name: 'slider-storage'
			}
		)
	)
);