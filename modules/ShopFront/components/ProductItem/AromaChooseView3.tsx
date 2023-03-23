import styles from './ProductItemMain/ProductItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import type { Product } from '../../models/Product';
import type { AromaCategory } from '../../models/AromaCategory';
import type { Aroma } from '../../models/Aroma';

type Props = {
	product: Product;
	selectedAromaCategory: AromaCategory;
	aromasByCategory: Aroma[];
	chooseAroma: (aroma: Aroma) => void;
	toView1: React.Dispatch<React.SetStateAction<void>>;
	toPreviousView: React.Dispatch<React.SetStateAction<void>>;
};

export const AromaChooseView3 = ({
	product,
	selectedAromaCategory,
	aromasByCategory,
	chooseAroma,
	toView1,
	toPreviousView,
}: Props): JSX.Element => (
	<>
		<div className={styles.productHeader}>
			<ArrowBackIcon
				className={styles.backIcon}
				onClick={() => toPreviousView()}
			/>
			<h3>{product.name}</h3>
			<CloseIcon className={styles.closeIcon} onClick={() => toView1()} />
		</div>
		<p className={styles.additinalInfo}>{product.description}</p>
		<p>{product.price} ₽</p>
		<h3 className={styles.heading}>{selectedAromaCategory.name}</h3>
		<ul>
			{aromasByCategory.map((aroma: Aroma) => (
				<li
					key={aroma.id}
					onClick={() => {
						chooseAroma(aroma);
					}}
				>
					<Button className={styles.button}>{aroma.name}</Button>
				</li>
			))}
		</ul>
	</>
);
