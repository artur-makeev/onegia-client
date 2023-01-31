import { makeAutoObservable } from 'mobx';
import { ClientInfo, BasketProduct, ShippingType } from '../models/Models';

export default class OrderStore {
	_id: number;
	_confirmed: boolean;
	_products: BasketProduct[];
	_clientInfo: ClientInfo;
	_deliveryPrice: number;
	_deliveryTime: number;
	_shippingType: ShippingType;
	constructor() {
		this._id = 0;
		this._confirmed = false;
		this._products = [];
		this._clientInfo = {
			lastName: '',
			firstName: '',
			fatherName: '',
			email: '',
			phone: '',
			address: '',
			contact: ''
		};
		this._deliveryPrice = 0;
		this._deliveryTime = 0;
		this._shippingType = '';
		makeAutoObservable(this);
	}

	setId(id: number) {
		this._id = id;
	}

	setConfirmed(confirmed: boolean) {
		this._confirmed = confirmed;
	}

	setProducts(products: BasketProduct[]) {
		this._products = products;
	}

	setClientInfo(clientInfo: ClientInfo) {
		this._clientInfo = clientInfo;
	}

	setDeliveryPrice(deliveryPrice: number) {
		this._deliveryPrice = deliveryPrice;
	}

	setDeliveryTime(deliveryTime: number) {
		this._deliveryTime = deliveryTime;
	}

	setShippingType(shippingType: ShippingType) {
		this._shippingType = shippingType;
	}

	get id() {
		return this._id;
	}

	get confirmed() {
		return this._confirmed;
	}

	get products() {
		return this._products;
	}

	get clientInfo() {
		return this._clientInfo;
	}

	get deliveryPrice() {
		return this._deliveryPrice;
	}

	get deliveryTime() {
		return this._deliveryTime;
	}

	get shippingType() {
		return this._shippingType;
	}

	get productsQuantity() {
		let count = 0;
		this.products.forEach((product: BasketProduct) => {
			count += product.count;
		});
		return count;
	}

	get productsPrice() {
		let priceCounter = 0;
		this.products.forEach((product: BasketProduct) => {
			priceCounter += (product.price * product.count);
		});
		return priceCounter;
	}

}
