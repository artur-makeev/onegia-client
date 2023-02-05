import { PaymentUrl } from '../models/Models';
import { $host } from './index';

export interface ReceiptItem {
	name: string,
	quantity: string,
	sum: string,
	payment_method: 'full_payment',
	payment_object: 'commodity' | 'service',
	tax: 'none'
}

export interface PayRequest {
	outSum: string,
	invId: string,
	items: ReceiptItem[]
}


export const generatePayment = async (body: PayRequest) => {
	const { data } = await $host.post<PaymentUrl>('api/payment/link', body);
	return data;
};