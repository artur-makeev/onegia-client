import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BasketSummary, OrderProducts } from '../components/index';
import styles from '../styles/basket.module.css';
import { Context } from './_app';
import { useRouter } from 'next/router';

const BasketPage = (): JSX.Element => {
	const { basket } = useContext(Context);
	const router = useRouter();
	useEffect(() => {
		if (basket.loaded) {
			if (basket.productsQuantity < 1) {
				router.push('/shop');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basket.productsQuantity]);

	return (
		<div className={styles.container}>
			<h1>Корзина</h1>
			<div className={styles.contentContainer}>
				<div className={styles.productsContainer}>
					<OrderProducts products={basket.products} page='basket' />

					<BasketSummary
						productsQuantity={basket.productsQuantity}
						totalPrice={basket.totalPrice}
					/>
				</div>
			</div>
		</div>
	);
};

export default observer(BasketPage);
