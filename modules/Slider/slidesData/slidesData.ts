import type { Slide } from '../models/Slide';
import slide1 from '../../../public/images/slider/candle-slide.png';
import slide2 from '../../../public/images/slider/perfume-slide.png';
import slide3 from '../../../public/images/slider/gift-slide.png';

export const slidesData: Slide[] = [
	{
		id: 1,
		title: 'Cвечи',
		desc: 'Треск деревянного фититля и широкая палитра ароматов создают уютную атмостферу',
		img: slide1,
	},
	{
		id: 2,
		title: 'Твердые духи',
		desc: 'Стильный аксессуар подчеркивает своим ароматом вашу индивидуальность',
		img: slide2,
	},
	{
		id: 3,
		title: 'Подарки',
		desc: 'Нежно упакованные подарки на все случаи жизни',
		img: slide3,
	},
];
