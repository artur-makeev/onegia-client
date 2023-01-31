import { PaymentResult } from '../components';
import styles from '../styles/page.module.css';


export default function fail() {
	return (
		<div className={styles.container}>
			<PaymentResult paymentSuccessful={false} />
		</div>
	);
}