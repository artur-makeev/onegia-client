import { BasketProducts } from '../modules/Basket';
import styles from '../styles/basket.module.css';
import { BasketSummary } from '../modules/Basket';
import { useBasketStore } from '../modules/Basket/store/BasketStore';
import { useBasketProductsQuantity, useBasketTotalPrice } from '../modules/Basket/store/BasketComputedValues';
import { NoProducts } from '../modules/Basket/components/noProducts/NoProducts';
import { useHasHydrated } from '../hooks/useHasHydrated';


const BasketPage = (): JSX.Element => {
	const hasHydrated = useHasHydrated();

	const basketProducts = useBasketStore(state => state.products);
	const [productsQuantity] = useBasketProductsQuantity();
	const [totalPrice] = useBasketTotalPrice();

	return (
		<div className={styles.container}>
			<h1>Корзина</h1>
			<div className={styles.contentContainer}>
				{hasHydrated && basketProducts.length > 0 ?
					<div className={styles.productsContainer}>
						<BasketProducts products={basketProducts} />
						<BasketSummary
							productsQuantity={productsQuantity}
							totalPrice={totalPrice}
						/>
					</div>
					:
					<NoProducts />
				}

			</div>
		</div>
	);
};

export default BasketPage;
