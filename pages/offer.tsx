import styles from '../styles/page.module.css';
import { PublicOffer } from '../modules/PublicOffer';

export default function OfferPage() {
	return (
		<div className={styles.container}>
			<PublicOffer />
		</div>
	);
}