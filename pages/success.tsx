import { PaymentResult } from '../components';
import styles from '../styles/page.module.css';

export default function SuccessPage() {
	return (
		<div className={styles.container}>
			<PaymentResult paymentSuccessful={true} />
		</div>
	);
}