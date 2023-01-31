import { observer } from 'mobx-react-lite';
import ProductItem from '../ProductItem/ProductItemMain/ProductItem';
import styles from './ProductList.module.css';
import { Product } from '../../../models/Models';

export const ProductList = observer(({ products }: any) => {

	return (
		<div className={styles.container}>
			{products.map((product: Product): JSX.Element =>
				<ProductItem key={product.id} product={product} />
			)}
		</div>
	);
});