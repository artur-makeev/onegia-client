import { useContext, useRef } from 'react';
import styles from './Slider.module.css';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { slidesData } from '../..';
import { observer } from 'mobx-react-lite';
import { Slide } from '../../../../models/Models';
import { Context } from '../../../../pages/_app';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';

export const Slider = observer(({ slides }: any) => {
	const { slide } = useContext(Context);
	const itemsRef = useRef<HTMLButtonElement[]>([]);

	const switchToRightSlide = () => slide.setSlideIndex(slide.slideIndex < (slidesData.length - 1) ? slide.slideIndex + 1 : 0);
	const switchToLeftSlide = () => slide.setSlideIndex(slide.slideIndex > 0 ? slide.slideIndex - 1 : slidesData.length - 1);

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
				slide.setSlideIndex(slide.slideIndex + 1);
				setTimeout(() => {
					itemsRef.current[index + 1].focus();
				}, 500);
			} else {
				slide.setSlideIndex(0);
			}
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.wrapper} ${slide.slideIndex === 0 ? styles.switchSlide1 :
					slide.slideIndex === 1 ? styles.switchSlide2 : styles.switchSlide3}`}
			>
				{slides.map((slide: any, index: any, array: any) => {
					return (
						<div key={slide.id} className={styles.slide}>
							<div className={styles.imgContainer}>
								<Image
									className={styles.image}
									src={slide.img}
									priority={slide.id === 1 ? true : false}
									placeholder="empty"
									fill={true}
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
										>
											<ArrowBackIosOutlinedIcon />
										</div>
										<div
											className={`${styles.arrow} ${styles.rightArrow}`}
											onClick={() => handleClick('right')}
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
});

