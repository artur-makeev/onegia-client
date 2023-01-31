import { makeAutoObservable, runInAction } from 'mobx';
import { BasketProduct } from '../models/Models';

export default class BasketStore {
	_products: BasketProduct[];
	_loaded: boolean;
	constructor() {
		this._products = [];
		this._loaded = false;
		makeAutoObservable(this);
	}

	setProducts(products: BasketProduct[]) {
		this._products = products;
	}

	get products() {
		return this._products;
	}

	get loaded() {
		return this._loaded;
	}

	get productsQuantity() {
		let count = 0;
		this.products.forEach((product: BasketProduct) => {
			count += product.count;
		});
		return count;
	}

	get totalPrice() {
		let priceCounter = 0;
		this.products.forEach((product: BasketProduct) => {
			priceCounter += (product.price * product.count);
		});
		return priceCounter;
	}

	setLoaded(value: boolean) {
		this._loaded = value;
	}

	emptyBasket() {
		this.setProducts([]);
	}

	addProduct(productId: number, productName: string, price: number, img: string, aromaId: number, aromaName: string, quantity: number) {
		if (!productId) {
			throw new Error('productId was not specified');
		}

		if (!quantity) {
			throw new Error('quantity was not specified');
		}

		if (!this.products.some((product: BasketProduct) => {
			if (product.productId === productId && product.aromaId === aromaId) {
				runInAction(() => {
					product.count++;
				});
			}
			return product.productId === productId && product.aromaId === aromaId;
		})
		) {
			this.products.push({
				"productId": productId,
				"name": productName,
				"price": price,
				"img": img,
				"aromaId": aromaId,
				"aromaName": aromaName,
				"count": quantity
			});
		}

		localStorage.setItem('products', JSON.stringify(this.products));
	}

	async deleteProduct(productId: number, aromaId: number) {
		this.products.some((product: BasketProduct, index: number, array: BasketProduct[]) => {
			if (product.productId === productId && product.aromaId === aromaId) {
				runInAction(() => {
					product.count--;
					if (product.count === 0) {
						array.splice(index, 1);
					}
				});
				localStorage.setItem('products', JSON.stringify(this.products));

				return true;
			}

			return false;
		});
	}
}
