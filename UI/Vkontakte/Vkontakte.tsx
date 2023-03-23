import styles from './Vkontakte.module.css';

type Props = {
	hover: boolean;
	burgerMenu: boolean;
};

export const Vkontakte = ({ hover, burgerMenu }: Props): JSX.Element => (
	<svg
		className={
			burgerMenu ? styles.svgBurgerMenu : hover ? styles.svgHover : styles.svg
		}
		viewBox='0 0 24 24'
	>
		<path
			className='st0'
			d='M12.8,18.5c-6.4,0-10-5-10.1-13.4h3.2c0.1,6.1,2.5,8.7,4.3,9.2V5.1h3v5.3c1.8-0.2,3.8-2.6,4.4-5.3h3
	c-0.5,2.8-2,5.2-4.1,6.7c2.4,1.4,4.1,3.8,4.7,6.7h-3.4c-0.6-2.5-2.5-4.4-4.8-4.8v4.8H12.8z'
		/>
	</svg>
);
