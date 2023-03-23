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

function createData(
	image: string,
	productInfo: {
		name: string;
		aroma: string;
		productId: number;
		aromaId: number;
	},
	price: number,
	quantity: number
) {
	return { image, productInfo, price, quantity };
}

type Props = {
	products: BasketProduct[];
};

export const BasketProducts = ({ products }: Props): JSX.Element => {
	const myLoader = ({
		src,
		width,
		quality,
	}: {
		src: string;
		width: number;
		quality?: number;
	}): string => `${src}?w=${width}&q=${quality || 100}`;

	const rows = products.map((product) =>
		createData(
			process.env.NEXT_PUBLIC_API_URL + '/static/' + product.img,
			{
				name: product.name,
				aroma: product.aromaName,
				productId: product.productId,
				aromaId: product.aromaId,
			},
			product.price,
			product.count
		)
	);

	return (
		<TableContainer component={Paper} className={styles.container}>
			<Table aria-label='products'>
				<TableBody>
					{rows.map((row, i) => (
						<TableRow
							key={row.productInfo.name + row.productInfo.aroma}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell className={`${styles.img} ${styles.cell}`}>
								<Image
									src={row.image}
									width={150}
									height={150}
									loader={myLoader}
									alt={row.productInfo.name}
									priority={i === 0 ? true : false}
								/>
							</TableCell>
							<TableCell align='left' className={styles.cell}>
								<p>{row.productInfo.name}</p>
								<p>Аромат</p>
								<p>{row.productInfo.aroma}</p>
							</TableCell>
							<TableCell
								className={`${styles.price} ${styles.cell}`}
								align='right'
							>
								{row.price} ₽
							</TableCell>
							<TableCell align='right' className={styles.cell}>
								<div className={styles.quantity}>
									<ProductQuantity
										productId={row.productInfo.productId}
										count={row.quantity}
										aromaId={row.productInfo.aromaId}
									/>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
