import { PaymentResult } from '../components';
import styles from '../styles/page.module.css';

export default function Success() {
	return (
		<div className={styles.container}>
			<PaymentResult paymentSuccessful={true} />
		</div>
	);
}