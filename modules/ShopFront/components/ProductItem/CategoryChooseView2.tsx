import styles from './ProductItemMain/ProductItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Product, AromaCategory } from '../../../../models/Models';
import { Button } from '@mui/material';

type Props = {
	product: Product,
	aromaCategories: AromaCategory[],
	chooseAromaCategory: (arg: AromaCategory) => void,
	toView1: React.Dispatch<React.SetStateAction<void>>,
	toPreviousView: React.Dispatch<React.SetStateAction<void>>
};

export const CategoryChooseView2 = ({
	product,
	aromaCategories,
	chooseAromaCategory,
	toView1,
	toPreviousView
}: Props): JSX.Element => {
	return (
		<>
			<div className={styles.productHeader}>
				<ArrowBackIcon
					className={styles.backIcon}
					onClick={() => toPreviousView()}
				/>
				<h3>{product.name}</h3>
				<CloseIcon
					className={styles.closeIcon}
					onClick={() => toView1()}
				/>
			</div>
			<p className={styles.additinalInfo}>{product.description}</p>
			<p>{product.price} ₽</p>
			<h3>Категории ароматов</h3>
			<div className={styles.aromaList}>
				{aromaCategories.map((aromaCategory: any) => {
					return (
						<Button
							className={styles.categoryButton}
							key={aromaCategory.id}
							variant='outlined'
							color='secondary'
							onClick={() => chooseAromaCategory(aromaCategory)}
						>
							{aromaCategory.name}
						</Button>
					);
				})}
			</div>
		</>
	);
};