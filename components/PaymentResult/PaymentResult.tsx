import styles from './PaymentResult.module.css';
import Paper from '@mui/material/Paper';

type Props = { paymentSuccessful: boolean };

export const PaymentResult = (({ paymentSuccessful }: Props): JSX.Element => {




	return (
		<div className={styles.container}>
			<Paper className={styles.contentContainer}>
				{paymentSuccessful ?
					<div>
						<h1>Оплата прошла успешно</h1>
						<p>Спасибо за заказ.</p>
					</div>
					:
					<div>
						<h1>Что-то пошло не так</h1>
						<p>В ближайшее время с Вами свяжется менеджер.</p>
						<p>Если в результате оплаты у вас были списаны денежные средства, значит оплата прошла успешно,
							и ваш заказ будет обработан.
						</p>
					</div>
				}
			</Paper>
		</div>
	);
});