import styles from '../styles/shop.module.css';
import { ProductList } from '../modules/ShopFront';
import type { Product } from '../modules/ShopFront';

type Props = {
	products: Product[];
};

const ShopPage = ({ products }: Props): JSX.Element => (
	<div className={styles.container}>
		<ProductList products={products} />
	</div>
);

export default ShopPage;

export const getStaticProps = async () => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_API_URL + '/api/product'
	);
	const products = await response.json();

	if (!products) {
		return { notFound: true };
	}

	return {
		props: {
			products: products.rows as Product[],
		},
	};
};
