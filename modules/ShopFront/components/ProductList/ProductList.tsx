import ProductItem from '../ProductItem/ProductItemMain/ProductItem';
import styles from './ProductList.module.css';
import type { Product } from '../../models/Product';

interface ProductListProps {
	products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => (
	<ul aria-label='products' className={styles.container}>
		{products.map((product: Product) => (
			<ProductItem key={product.id} product={product} />
		))}
	</ul>
);
