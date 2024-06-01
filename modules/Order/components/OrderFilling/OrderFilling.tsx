import styles from './OrderFilling.module.css';
import { useState } from 'react';
import { AddressForm } from '../AddressForm/AddressForm';
import Button from '@mui/material/Button';
import { orderConfirm } from '../../api/orderApi';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { OFFER_ROUTE } from '../../../../utilities/consts';
import { OrderProducts } from '../OrderProducts/OrderProducts';
import { daySpelling } from '../../helpers/daySpelling';
import { useBasketStore } from '../../../Basket/store/BasketStore';
import { useBasketProductsQuantity } from '../../../Basket/store/BasketComputedValues';
import { useBasketTotalPrice } from '../../../Basket/store/BasketComputedValues';
import { NoProductsToOrder } from '../noProducts/NoProducts';
import { useOrderStore } from '../../store/OrderStore';

export const OrderFilling = (): JSX.Element => {
	const [formValid, setFormValid] = useState(false);
	const router = useRouter();

	const basketProducts = useBasketStore((state) => state.products);
	const basketLoaded = useBasketStore((state) => state.loaded);
	const basketSetProducts = useBasketStore((state) => state.setProducts);
	const [basketTotalPrice] = useBasketTotalPrice();
	const [basketProductsQuantity] = useBasketProductsQuantity();

	const orderProducts = useOrderStore((state) => state.products);
	const clientInfo = useOrderStore((state) => state.clientInfo);
	const shippingType = useOrderStore((state) => state.shippingType);
	const deliveryTime = useOrderStore((state) => state.deliveryTime);
	const deliveryPrice = useOrderStore((state) => state.deliveryPrice);
	const setId = useOrderStore((state) => state.setId);
	const setProducts = useOrderStore((state) => state.setProducts);
	const setDeliveryPrice = useOrderStore((state) => state.setDeliveryPrice);

	const createOrder = async () => {
		let shippingPrice: number;

		if (
			shippingType === 'pickup' ||
			shippingType === 'yandex' ||
			basketTotalPrice >= 4000
		) {
			setDeliveryPrice(0);
			shippingPrice = 0;
		} else {
			shippingPrice = deliveryPrice;
		}

		const formData = new FormData();
		formData.append('lastName', clientInfo.lastName);
		formData.append('firstName', clientInfo.firstName);
		formData.append('fatherName', clientInfo.fatherName);
		formData.append('email', clientInfo.email);
		formData.append('phone', clientInfo.phone);
		formData.append(
			'address',
			shippingType === 'cdek' ? clientInfo.address : 'Петрозаводск'
		);
		formData.append('contact', clientInfo.contact);
		formData.append('shippingType', shippingType);
		formData.append('shippingTime', deliveryTime.toString());
		formData.append('shippingPrice', shippingPrice.toString());
		formData.append('productsPrice', JSON.stringify(basketTotalPrice));
		formData.append('basketProducts', JSON.stringify(basketProducts));
		setId(await orderConfirm(formData));
		setProducts(basketProducts);
		basketSetProducts([]);
		localStorage.removeItem('products');
		router.push('/order-confirmed');
	};

	return (
		<div className={styles.container}>
			<h1>Оформление заказа</h1>
			{basketProducts.length > 0 ||
			(orderProducts.length > 0 && basketLoaded) ? (
				<div className={styles.orderContainer}>
					<div className={styles.addressContainer}>
						<div className={styles.orderForm}>
							<AddressForm setFormValid={setFormValid} />
							<Link href={OFFER_ROUTE} className={styles.offer}>
								Публичная оферта
							</Link>
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
									<div>Товары ({basketProductsQuantity} шт.)</div>
									<div>{basketTotalPrice} ₽</div>
								</div>
								{shippingType === 'cdek' && deliveryPrice !== 0 && (
									<div>
										{shippingType === 'cdek' && (
											<div className={styles.row}>
												<div>Доставка (СДЭК)</div>
												<div>
													{basketTotalPrice >= 4000 ? 0 : deliveryPrice} ₽
												</div>
											</div>
										)}
										<div className={styles.row}>
											<h4>Итого</h4>
											<h4>
												{basketTotalPrice +
													(basketTotalPrice >= 4000 ? 0 : deliveryPrice)}{' '}
												₽
											</h4>
										</div>
									</div>
								)}
								{shippingType === 'pickup' && (
									<div>
										<div className={styles.row}>
											<div>Самовывоз</div>
											<div>0 ₽</div>
										</div>
										<div className={styles.row}>
											<h4>Итого</h4>
											<h4>{basketTotalPrice} ₽</h4>
										</div>
										<div>
											<p>Самовывоз осуществляется</p>
											<p>по адресу: ул. Ригачина д. 47</p>
											<p>Время оговаривается с менеджером.</p>
										</div>
									</div>
								)}
								{shippingType === 'yandex' && basketTotalPrice < 4000 && (
									<p>доставка оплачивается отдельно</p>
								)}
								<p>При заказе от 4000 ₽ доставка - бесплатно.</p>
								<p>Производство займет 3 дня</p>
								{shippingType === 'cdek' && deliveryPrice !== 0 && (
									<p>
										Доставка займет {deliveryTime} {daySpelling(deliveryTime)}
									</p>
								)}
							</Paper>
							<OrderProducts products={basketProducts} />
						</div>
					</div>
				</div>
			) : (
				<NoProductsToOrder />
			)}
		</div>
	);
};
