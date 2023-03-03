
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from './NoProducts.module.css';


export const NoProducts = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<p>Нет товаров в корзине</p>
			<Link href={'/shop'}>
				<Button
					className={styles.shopButton}
					variant='contained'
				>
					Каталог
				</Button>
			</Link>
		</div>
	);
};