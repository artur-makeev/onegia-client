import type { StaticImageData } from 'next/image';

export interface Slide {
	id: number;
	title: string;
	desc: string;
	img: string | StaticImageData;
}
