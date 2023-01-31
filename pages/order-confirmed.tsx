import { OrderConfirmation } from '../components';
import styles from '../styles/order.module.css';

const OrderConfirmationPage = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<OrderConfirmation />
		</div>
	);
};

export default OrderConfirmationPage;