
import styles from './BasketSummary.module.css';
import { OFFER_ROUTE, ORDER_ROUTE } from '../../../../utilities/consts';
import { Button } from '@mui/material';
import Link from 'next/link';
import Paper from '@mui/material/Paper';

type Props = {
	productsQuantity: number,
	totalPrice: number,
};

export const BasketSummary = ({ productsQuantity, totalPrice }: Props): JSX.Element => {
	return (
		<Paper square className={styles.container}>
			<div className={styles.content}>
				<h3>Итог</h3>
				<div className={styles.summaryRow}>
					<p>Общая стоимость товаров ({productsQuantity})</p>
					<p>{totalPrice} ₽</p>
				</div>
				<p className={styles.deliveryNote}>*доставка оплачивается отдельно</p>
				<p className={styles.deliveryNote}>*производство занимает до 3х дней.</p>
				<p className={styles.deliveryNote}>
					<Link href={OFFER_ROUTE}>
						Публичная оферта
					</Link>
				</p>
				<Link href={ORDER_ROUTE}>
					<Button variant='contained'>
						Перейти к оформлению
					</Button>
				</Link>
			</div>
		</Paper>
	);
};