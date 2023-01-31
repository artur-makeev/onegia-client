import { OrderProducts } from '../../OrderProducts/OrderProducts';
import styles from './OrderConfirmation.module.css';
import Paper from '@mui/material/Paper';
import { Context } from '../../../pages/_app';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export const OrderConfirmation = () => {
	const { order } = useContext(Context);
	const router = useRouter();

	useEffect(() => {
		if (order.products.length === 0) {
			router.push('/shop');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [order.products]);

	return (
		<div className={styles.container}>
			<h1>{`Заказ №${order.id} оформлен`}</h1>
			<Paper square className={styles.orderSummary}>
				<p>В ближайшее время с Вами свяжется менеджер для обсуждения делатей доставки и оплаты.</p>
				<p>Получатель: {`${order.clientInfo.lastName} ${order.clientInfo.firstName} ${order.clientInfo.fatherName}`}</p>
				<p>Информация по заказу отправлена на почту: {order.clientInfo.email}</p>
				<p>Ваш телефон: {order.clientInfo.phone}</p>
				{order.shippingType === 'cdek' &&
					<p>Адрес пункта СДЭК: {order.clientInfo.address}</p>
				}
				<div className={styles.row}>
					<div>Товары ({order.productsQuantity} шт.)</div>
					<div>{order.productsPrice} ₽</div>
				</div>
				<div>
					<div className={styles.row}>
						{order.shippingType === 'cdek' ?
							<div>Доставка (СДЭК)</div>
							:
							<div>Самовывоз</div>
						}
						<div>{order.deliveryPrice} ₽</div>
					</div>
					<div className={styles.row}>
						<div>Итого</div>
						<div>{order.productsPrice + order.deliveryPrice} ₽</div>
					</div>
					{order.shippingType === 'pickup' &&
						<p>Самовывоз осуществляется из магазина "Твоя полка" в тц "Пирамида" по адресу: ул.Кирова д.19а (ежедневно с 10:00 до 20:00)</p>
					}
				</div>
				<p>При наличии вопросов обращайтесь по электронной почте:</p>
				<a href={`mailto:${process.env.NEXT_PUBLIC_SHOP_EMAIL}`}>{process.env.NEXT_PUBLIC_SHOP_EMAIL}</a>
			</Paper>
			<h4>Товары в заказе</h4>
			<div className={styles.productsContainer}>
				<OrderProducts products={order.products} page='order' />
			</div>

		</div>
	);
};