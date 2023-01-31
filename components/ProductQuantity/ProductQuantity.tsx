import { useState, useContext } from 'react';
import styles from './ProductQuantity.module.css';
import { observer } from 'mobx-react-lite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Context } from '../../pages/_app';

type Props = {
	productId: number;
	count: number;
	aromaId: number;
};

export const ProductQuantity = observer(({ productId, count, aromaId }: Props): JSX.Element => {
	const { basket } = useContext(Context);
	const [counter, setCounter] = useState(count);

	const oneMore = (id: number) => {
		basket.addProduct(id, '', 0, '', aromaId, '', 1);
		setCounter(counter + 1);
	};

	const oneLess = (id: number) => {
		if (counter < 1) {
			return;
		}
		basket.deleteProduct(id, aromaId);
		setCounter(counter - 1);
	};

	return (
		<>
			<RemoveIcon
				className={styles.icon}
				onClick={() => { oneLess(productId); }}
			/>
			<p>{counter} шт.</p>
			<AddIcon
				className={styles.icon}
				onClick={() => { oneMore(productId); }}
			/>
		</>
	);
});

