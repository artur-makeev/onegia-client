export interface BasketProduct {
	productId: number;
	name: string;
	price: number;
	img: string;
	aromaId: number;
	aromaName: string;
	count: number;
	weight: number;
}

export interface OrderProduct extends BasketProduct {}

export type Contact = 'call' | 'whatsup' | 'telegram' | 'email' | '';

export interface PaymentParams {
	MerchantLogin: string;
	OutSum: string;
	Description: string;
	SignatureValue: string;
	InvId: string;
	Encoding: string;
	Receipt: string;
	IsTest?: '0' | '1';
}

export interface PaymentUrl {
	url: string;
	params: PaymentParams;
}

export type ProductsWithIds = Record<string, number>;

declare global {
	interface FormDataValue {
		uri: string;
		name: string;
		type: string;
	}

	interface FormData {
		append(name: string, value: FormDataValue, fileName?: string): void;
		set(name: string, value: FormDataValue, fileName?: string): void;
	}
}
