import { OrderFilling } from '../modules/Order';
import styles from '../styles/order.module.css';

const OrderPage = (): JSX.Element => (
	<div className={styles.container}>
		<OrderFilling />
	</div>
);

export default OrderPage;
