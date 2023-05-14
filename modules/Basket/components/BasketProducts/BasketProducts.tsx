import styles from './BasketProducts.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { ProductQuantity } from '../ProductQuantity/ProductQuantity';
import type { BasketProduct } from '../../../../models/Models';
import { imageLoader } from '../../../../utilities/imageLoader';

interface BasketProductsProps {
	products: BasketProduct[];
}

export const BasketProducts = ({
	products,
}: BasketProductsProps): JSX.Element => (
	<TableContainer component={Paper} className={styles.container}>
		<Table aria-label='products'>
			<TableBody>
				{products.map((product, i) => (
					<TableRow
						key={product.name + product.aromaName}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell className={`${styles.img} ${styles.cell}`}>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_URL}/static/${product.img}`}
								width={150}
								height={150}
								loader={imageLoader}
								alt={product.name}
								priority={i === 0 ? true : false}
							/>
						</TableCell>
						<TableCell align='left' className={styles.cell}>
							<p>{product.name}</p>
							<p>Аромат</p>
							<p>{product.aromaName}</p>
						</TableCell>
						<TableCell
							className={`${styles.price} ${styles.cell}`}
							align='right'
						>
							{product.price} ₽
						</TableCell>
						<TableCell align='right' className={styles.cell}>
							<div className={styles.quantity}>
								<ProductQuantity
									productId={product.productId}
									count={product.count}
									aromaId={product.aromaId}
								/>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</TableContainer>
);
