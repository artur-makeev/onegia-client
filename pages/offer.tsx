import styles from '../styles/page.module.css';
import { PublicOffer } from '../components/index';

export default function OfferPage() {
	return (
		<div className={styles.container}>
			<PublicOffer />
		</div>
	);
}