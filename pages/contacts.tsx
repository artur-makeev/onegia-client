import { Contacts } from '../modules/Contacts';
import styles from '../styles/page.module.css';

export default function ContactsPage() {
	return (
		<div className={styles.container}>
			<Contacts />
		</div>
	);
}
