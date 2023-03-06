import { useRef } from 'react';
import styles from './Slider.module.css';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { slidesData } from '../..';
import { Slide } from '../../../../models/Models';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useSliderStore } from '../../store/SlideStore';


export const Slider = () => {

	const slideIndex = useSliderStore(state => state.slideIndex);
	const setSlideIndex = useSliderStore(state => state.setSlideIndex);
	const itemsRef = useRef<HTMLButtonElement[]>([]);

	const switchToRightSlide = () => setSlideIndex(slideIndex < (slidesData.length - 1) ? slideIndex + 1 : 0);
	const switchToLeftSlide = () => setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slidesData.length - 1);

	const handleClick = (direction: string) => {
		if (direction === 'left') {
			switchToLeftSlide();
		} else {
			switchToRightSlide();
		}
	};

	const handleTab = (e: React.KeyboardEvent, index: number, array: Slide[]) => {
		if (e.key === "Tab") {
			if (!(index === array.length - 1)) {
				e.preventDefault();
				setSlideIndex(slideIndex + 1);
				setTimeout(() => {
					itemsRef.current[index + 1].focus();
				}, 500);
			} else {
				setSlideIndex(0);
			}
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.wrapper} ${slideIndex === 0 ? styles.switchSlide1 : slideIndex === 1 ? styles.switchSlide2 : styles.switchSlide3}`}
			>
				{slidesData.map((slide, index: number, array: Slide[]) => {
					return (
						<div key={slide.id} className={styles.slide}>
							<div className={styles.imgContainer}>
								<Image
									className={styles.image}
									src={slide.img}
									priority={slide.id === 1 ? true : false}
									placeholder="empty"
									fill
									sizes="(max-width: 1095px) 623px, (max-width: 623px) 100vw"
									alt={slide.title}
								/>
							</div>
							<div className={styles.infoContainer}>
								<h1 className={styles.title}>{slide.title}</h1>
								<p className={styles.desc}>{slide.desc}</p>
								<div className={styles.buttons}>
									<Link href={'/shop'}>
										<Button
											className={styles.shopButton}
											variant='contained'
											onKeyDown={(e: React.KeyboardEvent): void => handleTab(e, index, array)}
											ref={(el: HTMLButtonElement): void => { itemsRef.current[index] = el; }}
										>
											Каталог
										</Button>
									</Link>
									<div className={styles.arrows}>
										<div
											className={`${styles.arrow} ${styles.leftArrow}`}
											onClick={() => handleClick('left')}
											data-testid="left slide"
										>
											<ArrowBackIosOutlinedIcon />
										</div>
										<div
											className={`${styles.arrow} ${styles.rightArrow}`}
											onClick={() => handleClick('right')}
											data-testid="right slide"
										>
											<ArrowForwardIosOutlinedIcon />
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})
				}
			</div>
		</div>
	);
};

