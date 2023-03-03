import ProductItem from '../ProductItem/ProductItemMain/ProductItem';
import styles from './ProductList.module.css';
import { Product } from '../../../../models/Models';

type Props = {
	products: Product[]
};

export const ProductList = ({ products }: Props) => {
	return (
		<ul aria-label='products' className={styles.container}>
			{products.map((product: Product): JSX.Element =>
				<ProductItem key={product.id} product={product} />
			)}
		</ul>
	);
};