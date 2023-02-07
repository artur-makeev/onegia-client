import { PaymentResult } from '../components';
import styles from '../styles/page.module.css';


export default function FailPage() {
	return (
		<div className={styles.container}>
			<PaymentResult paymentSuccessful={false} />
		</div>
	);
}