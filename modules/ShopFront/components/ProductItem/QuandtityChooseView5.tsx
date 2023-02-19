import styles from './ProductItemMain/ProductItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRef, useState } from 'react';
import { useContext } from 'react';
import { Product, Aroma } from '../../../../models/Models';
import { Context } from '../../../../pages/_app';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type Props = {
	product: Product,
	selectedAroma: Aroma,
	toView1: React.Dispatch<React.SetStateAction<void>>,
	toPreviousView: React.Dispatch<React.SetStateAction<void>>
};

export const QuantityChooseView5 = ({ product, selectedAroma, toView1, toPreviousView }: Props): JSX.Element => {
	const [quantity, setQuantity] = useState(1);
	const quantityValue = useRef(1);
	const { basket } = useContext(Context);

	const addToBasket = async () => {
		basket.addProduct(
			product.id,
			product.name,
			product.price,
			product.img,
			selectedAroma.id,
			selectedAroma.name,
			quantityValue.current,
			product.weight
		);

		setTimeout(() => {
			toView1();
		}, 500);
	};

	const oneLess = () => {
		if (quantity === 0) {
			toView1();
			setQuantity(1);
			quantityValue.current = 1;
		} else {
			setQuantity(quantity - 1);
			quantityValue.current--;
		}
	};

	const oneMore = () => {
		setQuantity(quantity + 1);
		quantityValue.current++;
	};

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
			<h3>Аромат:</h3>
			<h3>{selectedAroma.name}</h3>
			<h3 className={styles.quantityContainer}>
				<RemoveIcon
					onClick={() => oneLess()}
					className={styles.quantityIcon}
				/>
				<p>
					{quantity} шт.
				</p>
				<AddIcon
					onClick={() => oneMore()}
					className={styles.quantityIcon}
				/>
			</h3>
			<Button
				onClick={() => addToBasket()}
				className={styles.addToBasketButton}
				variant='contained'
			>
				<AddShoppingCartIcon className={styles.basketIcon} />
				Добавить в корзину
			</Button>
		</>
	);
};