import { useState } from 'react';
import styles from './ProductQuantity.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useBasketStore } from '../../store/BasketStore';

interface ProductQuantityProps {
	productId: number;
	count: number;
	aromaId: number;
}

export const ProductQuantity = ({
	productId,
	count,
	aromaId,
}: ProductQuantityProps): JSX.Element => {
	const addProduct = useBasketStore((state) => state.addProduct);
	const deleteProduct = useBasketStore((state) => state.deleteProduct);
	const [counter, setCounter] = useState(count);

	const oneMore = (id: number) => {
		addProduct(id, aromaId);
		setCounter(counter + 1);
	};

	const oneLess = (id: number) => {
		if (counter < 1) {
			return;
		}
		deleteProduct(id, aromaId);
		setCounter(counter - 1);
	};

	return (
		<>
			<RemoveIcon
				className={styles.icon}
				onClick={() => {
					oneLess(productId);
				}}
			/>
			<p>{counter} шт.</p>
			<AddIcon
				className={styles.icon}
				onClick={() => {
					oneMore(productId);
				}}
			/>
		</>
	);
};
