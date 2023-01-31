import styles from './ProductItemMain/ProductItem.module.css';
import { Product } from '../../../models/Models';
import Image from 'next/image';
import Button from '@mui/material/Button';

type Props = {
	product: Product,
	productVariations: () => void
};

export const ProductView1 = ({ product, productVariations }: Props): JSX.Element => {
	return (
		<div className={styles.product}>
			<div>
				<div className={styles.productPhoto}>
					<Image
						src={process.env.NEXT_PUBLIC_API_URL + "/static/" + product.img}
						width={300}
						height={300}
						unoptimized={true}
						priority={product.id === 1 ? true : false}
						alt={product.name} />
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
};