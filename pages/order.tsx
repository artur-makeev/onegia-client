import { OrderFilling } from '../components';
import styles from '../styles/order.module.css';

const OrderPage = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<OrderFilling />
		</div>
	);
};

export default OrderPage;