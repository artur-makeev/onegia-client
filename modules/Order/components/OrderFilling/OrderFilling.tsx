import styles from './OrderFilling.module.css';
import { useState, useEffect } from 'react';
import { AddressForm } from '../AddressForm/AddressForm';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { orderConfirm } from '../../api/orderApi';
import { toJS } from 'mobx';
import { Context } from '../../../../pages/_app';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { OFFER_ROUTE } from '../../../../utilities/consts';
import { OrderProducts } from '../OrderProducts/OrderProducts';
import { daySpelling } from '../../helpers/daySpelling';


export const OrderFilling = observer((): JSX.Element => {
	const { basket, order } = useContext(Context);
	const [formValid, setFormValid] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (basket.loaded) {
			if (basket.products.length === 0 && order.products.length === 0) {
				router.push('/shop');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basket.products, order.products]);

	const createOrder = async () => {
		const formData = new FormData();
		formData.append('lastName', order.clientInfo.lastName);
		formData.append('firstName', order.clientInfo.firstName);
		formData.append('fatherName', order.clientInfo.fatherName);
		formData.append('email', order.clientInfo.email);
		formData.append('phone', order.clientInfo.phone);
		formData.append('address', order.shippingType === 'pickup' ? order.shippingType : order.clientInfo.address);
		formData.append('contact', order.clientInfo.contact);
		formData.append('shippingType', order.shippingType);
		formData.append('shippingPrice', order.shippingType === 'pickup' || order.shippingType === 'yandex'
			? '0' : order.deliveryPrice.toString());
		formData.append('productsPrice', JSON.stringify(basket.totalPrice));
		formData.append('basketProducts', JSON.stringify(toJS(basket.products)));
		order.setId(await orderConfirm(formData));
		order.setProducts(basket.products);
		basket.setProducts([]);
		localStorage.removeItem('products');
		router.push('/order-confirmed');
	};

	return (
		<div className={styles.container}>
			<h1>Оформление заказа</h1>
			<div className={styles.orderContainer}>
				<div className={styles.addressContainer}>
					<div className={styles.orderForm}>
						<AddressForm
							setFormValid={setFormValid} />
						<Link href={OFFER_ROUTE} className={styles.offer}>Публичная оферта</Link>
						<Button
							disabled={!formValid}
							onClick={createOrder}
							variant='contained'
							className={styles.orderButton}
						>
							{formValid ? 'Подтвердить заказ' : 'Заполните данные'}
						</Button>
					</div>
				</div>
				<div className={styles.orderConfirm}>
					<div className={styles.orderResume}>
						<Paper square className={styles.orderTotal}>
							<h3>Ваш заказ</h3>
							<div className={styles.row}>
								<div>Товары ({basket.productsQuantity} шт.)</div>
								<div>{basket.totalPrice} ₽</div>
							</div>
							{order.shippingType === 'cdek' && order.deliveryPrice !== 0 &&
								<div>
									{order.shippingType === 'cdek' &&
										<div className={styles.row}>
											<div>Доставка (СДЭК)</div>
											<div>{order.deliveryPrice} ₽</div>
										</div>
									}
									<div className={styles.row}>
										<h4>Итого</h4>
										<h4>{basket.totalPrice + order.deliveryPrice} ₽</h4>
									</div>
									<p>Доставка займет {order.deliveryTime} {daySpelling(order.deliveryTime)}</p>
								</div>
							}
							{order.shippingType === 'pickup' &&
								<div>
									<div className={styles.row}>
										<div>Самовывоз</div>
										<div>0 ₽</div>
									</div>
									<div className={styles.row}>
										<h4>Итого</h4>
										<h4>{basket.totalPrice} ₽</h4>
									</div>
									<div>
										<p>Самовывоз осуществляется из магазина</p>
										<p>"Твоя полка" в тц "Пирамида"</p>
										<p>По адресу: ул.Кирова д.19а</p>
										<p>Ежедневно с 10:00 до 20:00</p>
									</div>
								</div>
							}
							{order.shippingType === 'yandex' &&
								<p>доставка оплачивается отдельно</p>
							}
							<p>Производство займет 3 дня</p>
						</Paper>
						<OrderProducts products={basket.products} />
					</div>
				</div>
			</div>
		</div>
	);
});