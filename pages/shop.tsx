import styles from '../styles/shop.module.css';
import { ProductList } from '../modules/ShopFront';
import type { Product } from '../modules/ShopFront';
import type { GetStaticProps } from 'next';
import axios from 'axios';
import type { ProductsResponse } from '../models/products.response';
import { getErrorMessage } from '../utilities/getErrorMessage';

interface ShopProps {
	products: Product[];
}

const ShopPage = ({ products }: ShopProps): JSX.Element => (
	<div className={styles.container}>
		<ProductList products={products} />
	</div>
);

export default ShopPage;

export const getStaticProps: GetStaticProps<ShopProps> = async () => {
	try {
		const { data: products } = await axios.get<ProductsResponse>(
			process.env.NEXT_PUBLIC_API_URL + '/api/product'
		);

		return {
			props: {
				products: products.rows,
			},
		};
	} catch (error) {
		console.log(getErrorMessage(error));
		return { notFound: true };
	}
};
