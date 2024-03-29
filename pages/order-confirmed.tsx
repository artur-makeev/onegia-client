import { OrderConfirmation } from '../modules/Order';
import styles from '../styles/order.module.css';

const OrderConfirmationPage = (): JSX.Element => (
	<div className={styles.container}>
		<OrderConfirmation />
	</div>
);

export default OrderConfirmationPage;
