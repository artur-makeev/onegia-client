import styles from './Contacts.module.css';
import Paper from '@mui/material/Paper';

export const Contacts = (): JSX.Element => (
	<div className={styles.container}>
		<Paper className={styles.contentContainer}>
			<div>
				<h1 className={styles.heading}>Контакты</h1>
				<p>
					Полное наименование: Индивидуальный предприниматель Гурова Алена
					Андреевна
				</p>
				<p>ИНН: 100125049861</p>
				<p>ОГРНИП: 322100100006534</p>
				<p>Email: client-service@onegia.ru</p>
				<p>Телефон: +7 921 012-60-04</p>
			</div>
		</Paper>
	</div>
);
