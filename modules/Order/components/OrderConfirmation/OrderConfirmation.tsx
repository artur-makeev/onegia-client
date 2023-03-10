import styles from './OrderConfirmation.module.css';
import Paper from '@mui/material/Paper';
import { PaymentParams } from '../../../../models/Models';
import { Button } from '@mui/material';
import { generatePayment, PayRequest, ReceiptItem } from '../../api/robokassaApi';
import { OrderProducts } from '../OrderProducts/OrderProducts';
import { useOrderStore } from '../../store/OrderStore';
import { NoProductsToOrder } from '../noProducts/NoProducts';
import { useGetProductsPrice, useGetProductsQuantity } from '../../store/OrderComputedValues';

export const OrderConfirmation = () => {
	// Order store
	const orderProducts = useOrderStore(state => state.products);
	const clientInfo = useOrderStore(state => state.clientInfo);
	const shippingType = useOrderStore(state => state.shippingType);
	const products = useOrderStore(state => state.products);
	const deliveryPrice = useOrderStore(state => state.deliveryPrice);
	const orderId = useOrderStore(state => state.id);
	const [productsPrice] = useGetProductsPrice();
	const [productsQuantity] = useGetProductsQuantity();

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
		const receiptItems: ReceiptItem[] = products.map(product => {
			return {
				name: `${product.name} ${product.aromaName}`,
				quantity: JSON.stringify(product.count),
				sum: JSON.stringify(product.price * product.count),
				payment_method: 'full_payment',
				payment_object: 'commodity',
				tax: 'none'
			};
		});

		if (shippingType === 'cdek') {
			receiptItems.push({
				name: '????????????????',
				quantity: '1',
				sum: deliveryPrice.toString(),
				payment_method: 'full_payment',
				payment_object: 'service',
				tax: 'none'
			});
		}

		const request: PayRequest = {
			outSum: (productsPrice + deliveryPrice).toString(),
			invId: orderId.toString(),
			items: receiptItems,
		};
		generatePayment(request).then(res => {
			post(res.url, res.params);
		});
	};

	return (
		<div className={styles.container}>
			{orderProducts.length > 0 ?
				<>
					<h1>{`?????????? ???${orderId} ????????????????`}</h1>
					<Paper square className={styles.orderSummary}>
						<div className={styles.buttonContainer}>
							<Button
								onClick={makePayment}
								variant='contained'
								className={styles.button}
							>
								????????????????
							</Button>
						</div>
						<p>????????????????????: {`${clientInfo.lastName} ${clientInfo.firstName} ${clientInfo.fatherName}`}</p>
						<p>???????????????????? ???? ???????????? ???????????????????? ???? ??????????: {clientInfo.email}</p>
						<p>?????? ??????????????: {clientInfo.phone}</p>
						{shippingType === 'cdek' &&
							<p>?????????? ???????????? ????????: {clientInfo.address}</p>
						}
						<div className={styles.row}>
							<div>???????????? ({productsQuantity} ????.)</div>
							<div>{productsPrice} ???</div>
						</div>
						<div>
							<div className={styles.row}>
								{shippingType === 'cdek' &&
									<div>???????????????? (????????)</div>
								}
								{shippingType === 'yandex' &&
									<div>???????????? ???????????????? ???????????????????????? ????????????????</div>
								}
								{shippingType === 'pickup' &&
									<div>??????????????????</div>
								}
								{shippingType === 'cdek' &&
									<div>{deliveryPrice} ???</div>
								}
								{shippingType === 'pickup' &&
									<div>{deliveryPrice} ???</div>
								}
							</div>
							{shippingType !== 'yandex' &&
								<div className={styles.row}>
									<div>??????????</div>
									<div>{productsPrice + deliveryPrice} ???</div>
								</div>
							}
							{shippingType === 'pickup' &&
								<p>?????????????????? ???????????????????????????? ???? ???????????????? "???????? ??????????" ?? ???? "????????????????" ???? ????????????: ????.???????????? ??.19?? (?????????????????? ?? 10:00 ???? 20:00)</p>
							}
						</div>
						<p>?????? ?????????????? ???????????????? ?????????????????????? ???? ?????????????????????? ??????????:</p>
						<a href={`mailto:${process.env.NEXT_PUBLIC_SHOP_EMAIL}`}>{process.env.NEXT_PUBLIC_SHOP_EMAIL}</a>
					</Paper>
					<h4>???????????? ?? ????????????</h4>
					<div className={styles.productsContainer}>
						<OrderProducts products={products} />
					</div>
				</>
				:
				<NoProductsToOrder />
			}
		</div>
	);
};