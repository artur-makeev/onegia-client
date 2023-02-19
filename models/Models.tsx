import type { StaticImageData } from "next/image";

export interface Product {
	id: number,
	name: string,
	price: number,
	img: string,
	description: string,
	categoryId: number,
	weight: number
}

export interface ProductCategory {
	id: number,
	name: string,
	createdAt?: string | null,
	updatedAt?: string | null
}

export interface BasketProduct {
	productId: number,
	name: string,
	price: number,
	img: string,
	aromaId: number,
	aromaName: string,
	count: number,
	weight: number,
}

export interface OrderProduct extends BasketProduct {}

export type Contact = 'call' | 'whatsup' | 'telegram' | 'email' | '';

export interface ClientInfo {
	lastName: string,
	firstName: string,
	fatherName: string,
	email: string,
	phone: string,
	address: string,
	contact: Contact
}

export interface Slide {
	id: number,
	title: string,
	desc: string,
	img: string | StaticImageData;
}

export interface AromaCategory {
	id: number,
	name: string
}

export interface Aroma {
	id: number,
	name: string
}

export interface AromaDescription {
	top: string,
	heart: string,
	base: string
}

export type RegionOption = string;

export interface Region {
	region: RegionOption,
	region_code: number
}

export type CityOption = string;

export interface City {
	code: number,
	city: CityOption,
	longitude: number,
	latitude: number
}

export type AddressOption = string;

export interface Branch {
	code: string,
	longitude: number,
	latitude: number,
	address: AddressOption
}

export interface Coords {
	latitude: number,
	longitude: number
}

export type ShippingType = 'pickup' | 'cdek' | 'yandex' | '';

export interface PaymentParams {
	MerchantLogin: string,
	OutSum: string,
	Description: string,
	SignatureValue: string,
	InvId: string,
	Encoding: string,
	Receipt: string,
	IsTest?: '0' | '1',
}

export interface PaymentUrl {
	url: string,
	params: PaymentParams
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