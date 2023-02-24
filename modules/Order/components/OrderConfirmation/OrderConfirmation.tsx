import styles from './OrderConfirmation.module.css';
import Paper from '@mui/material/Paper';
import { Context } from '../../../../pages/_app';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { PaymentParams } from '../../../../models/Models';
import { Button } from '@mui/material';
import { generatePayment, PayRequest, ReceiptItem } from '../../api/robokassaApi';
import { OrderProducts } from '../OrderProducts/OrderProducts';

export const OrderConfirmation = () => {
	const { order } = useContext(Context);
	const router = useRouter();

	function post(path: string, params: PaymentParams) {
		const form = document.createElement('form');
		form.method = 'post';
		form.action = path;

		for (const key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const hiddenField: HTMLInputElement = document.createElement('input');
				hiddenField.type = 'hidden';
				hiddenField.name = key;
				hiddenField.value = params[key as keyof PaymentParams] as string;
				form.appendChild(hiddenField);
			}
		}

		document.body.appendChild(form);
		form.submit();
	}

	const makePayment = () => {
		const receiptItems: ReceiptItem[] = order.products.map(product => {
			return {
				name: `${product.name} ${product.aromaName}`,
				quantity: JSON.stringify(product.count),
				sum: JSON.stringify(product.price * product.count),
				payment_method: 'full_payment',
				payment_object: 'commodity',
				tax: 'none'
			};
		});

		if (order.shippingType === 'cdek') {
			receiptItems.push({
				name: 'доставка',
				quantity: '1',
				sum: JSON.stringify(order.deliveryPrice),
				payment_method: 'full_payment',
				payment_object: 'service',
				tax: 'none'
			});
		}

		const request: PayRequest = {
			outSum: JSON.stringify(order.productsPrice),
			invId: JSON.stringify(order.id),
			items: receiptItems,
		};
		generatePayment(request).then(res => {
			post(res.url, res.params);
		});
	};

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
				<div className={styles.buttonContainer}>
					<Button
						onClick={makePayment}
						variant='contained'
						className={styles.button}
					>
						Оплатить
					</Button>
				</div>
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
						{order.shippingType === 'cdek' &&
							<div>Доставка (СДЭК)</div>
						}
						{order.shippingType === 'yandex' &&
							<div>Яндекс доставка оплачивается отдельно</div>
						}
						{order.shippingType === 'pickup' &&
							<div>Самовывоз</div>
						}
						{order.shippingType === 'cdek' || order.shippingType === 'pickup' &&
							<div>{order.deliveryPrice} ₽</div>
						}
					</div>
					{order.shippingType !== 'yandex' &&
						<div className={styles.row}>
							<div>Итого</div>
							<div>{order.productsPrice + order.deliveryPrice} ₽</div>
						</div>
					}
					{order.shippingType === 'pickup' &&
						<p>Самовывоз осуществляется из магазина "Твоя полка" в тц "Пирамида" по адресу: ул.Кирова д.19а (ежедневно с 10:00 до 20:00)</p>
					}
				</div>
				<p>При наличии вопросов обращайтесь по электронной почте:</p>
				<a href={`mailto:${process.env.NEXT_PUBLIC_SHOP_EMAIL}`}>{process.env.NEXT_PUBLIC_SHOP_EMAIL}</a>
			</Paper>
			<h4>Товары в заказе</h4>
			<div className={styles.productsContainer}>
				<OrderProducts products={order.products} />
			</div>

		</div>
	);
};