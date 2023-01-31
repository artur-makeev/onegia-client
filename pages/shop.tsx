import { observer } from 'mobx-react-lite';
import styles from '../styles/shop.module.css';
import { ProductList } from '../components/index';
import { Product } from '../models/Models';

type Props = {
	products: Product[]
};

const Shop = observer(({ products }: Props): JSX.Element => {
	return (
		<div className={styles.container}>
			<ProductList products={products} />
		</div>
	);
});

export default Shop;

export const getStaticProps = async () => {
	const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/product',);
	const products = await response.json();

	if (!products) {
		return { notFound: true };
	}

	return {
		props: {
			products: products.rows as Product[]
		}
	};
};