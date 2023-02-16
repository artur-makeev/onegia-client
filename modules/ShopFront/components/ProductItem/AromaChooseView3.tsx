import styles from './ProductItemMain/ProductItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Aroma, AromaCategory, Product } from '../../../../models/Models';
import { Button } from '@mui/material';

type Props = {
	product: Product,
	selectedAromaCategory: AromaCategory,
	aromas: Aroma[],
	chooseAroma: (aromaCategory: AromaCategory) => void,
	toView1: React.Dispatch<React.SetStateAction<void>>,
	toPreviousView: React.Dispatch<React.SetStateAction<void>>
};

export const AromaChooseView3 = (
	{ product, selectedAromaCategory, aromas, chooseAroma, toView1, toPreviousView }: Props): JSX.Element => {
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
			<h3 className={styles.heading}>{selectedAromaCategory.name}</h3>
			<ul>
				{aromas.map((aroma: Aroma) => {
					return (
						<li key={aroma.id}
							onClick={() => { chooseAroma(aroma); }}
						>
							<Button className={styles.button}>
								{aroma.name}
							</Button>
						</li>
					);
				})}
			</ul>
		</>
	);
};