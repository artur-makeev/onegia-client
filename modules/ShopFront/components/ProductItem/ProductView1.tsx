import styles from './ProductItemMain/ProductItem.module.css';
import type { Product } from '../../models/Product';
import Image from 'next/image';
import Button from '@mui/material/Button';
import { imageLoader } from '../../../../utilities/imageLoader';

type Props = {
	product: Product;
	productVariations: () => void;
};

export const ProductView1 = ({
	product,
	productVariations,
}: Props): JSX.Element => (
	<div className={styles.product}>
		<div>
			<div className={styles.productPhoto}>
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + '/static/' + product.img}
					width={300}
					height={300}
					loader={imageLoader}
					priority={product.id === 1 ? true : false}
					alt={product.name}
				/>
			</div>
			<div className={styles.description}>
				<p>{product.name}</p>
				<p className={styles.additinalInfo}>{product.description}</p>
				<p>{product.price} ₽</p>
			</div>
		</div>
		<div className={styles.buttonWrapper}>
			<Button
				className={styles.button}
				variant='contained'
				onClick={productVariations}
			>
				Выбрать аромат
			</Button>
		</div>
	</div>
);
