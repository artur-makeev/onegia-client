import styles from './ProductItemMain/ProductItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//import { Aroma, AromaDescription, Product } from '../../../../models/Models';
import { Button } from '@mui/material';
import { Htag } from '../../../../UI/Htag/Htag';
import type { Aroma } from '../../models/Aroma';
import type { AromaDescription } from '../../models/AromaDescription';
import type { Product } from '../../models/Product';

type Props = {
	product: Product;
	selectedAroma: Aroma;
	aromaDescription: AromaDescription;
	toView1: React.Dispatch<React.SetStateAction<void>>;
	setView2: React.Dispatch<React.SetStateAction<void>>;
	toNextView: React.Dispatch<React.SetStateAction<void>>;
};

export const AromaInfoView4 = ({
	product,
	selectedAroma,
	aromaDescription,
	toView1,
	setView2,
	toNextView,
}: Props): JSX.Element => (
	<>
		<div className={styles.productHeader}>
			<ArrowBackIcon className={styles.backIcon} onClick={() => setView2()} />
			<h3>{product.name}</h3>
			<CloseIcon className={styles.closeIcon} onClick={() => toView1()} />
		</div>
		<p className={styles.additinalInfo}>{product.description}</p>
		<p>{product.price} ₽</p>
		<h3 className={styles.heading}>{selectedAroma.name}</h3>
		<div
			className={
				selectedAroma.id
					? `${styles.aromaDescription} ${styles.showAromaDescription}`
					: styles.aromaDescription
			}
		>
			<div>
				<Htag tag='h4'>Верхние ноты</Htag>
				<div>{aromaDescription.top}</div>
			</div>
			<div>
				<Htag tag='h4'>Средние ноты</Htag>
				<div>{aromaDescription.heart}</div>
			</div>
			<div>
				<Htag tag='h4'>Нижние ноты</Htag>
				<div>{aromaDescription.base}</div>
			</div>
		</div>
		<Button
			onClick={() => toNextView()}
			className={selectedAroma.id ? styles.button : styles.hide}
			variant='contained'
		>
			Далее
		</Button>
	</>
);
