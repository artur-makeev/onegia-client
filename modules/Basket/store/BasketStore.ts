import { create } from 'zustand';
import type { BasketProduct } from '../../../models/Models';

interface ProductInfo {
	productName: string;
	price: number;
	img: string;
	aromaName: string;
	quantity: number;
	weight: number;
}

interface BasketState {
	products: BasketProduct[];
	loaded: boolean;
	setProducts: (products: BasketProduct[]) => void;
	setLoaded: (value: boolean) => void;
	addProduct: (
		productId: number,
		aromaId: number,
		productInfo?: ProductInfo
	) => void;
	deleteProduct: (productId: number, aromaId: number) => void;
}

export const useBasketStore = create<BasketState>()((set) => ({
	products: [],
	loaded: false,

	setLoaded: (value) => set(() => ({ loaded: value })),

	setProducts: (products) => set(() => ({ products: products })),

	addProduct: (productId, aromaId, productInfo) =>
		set((state) => {
			const productsRaw = [...state.products];
			const productIndex = productsRaw.findIndex(
				(product) =>
					product.productId === productId && product.aromaId === aromaId
			);

			if (productIndex >= 0) {
				productsRaw[productIndex].count += 1;
			} else if (productInfo) {
				productsRaw.push({
					productId,
					aromaId,
					name: productInfo.productName,
					price: productInfo.price,
					img: productInfo.img,
					aromaName: productInfo.aromaName,
					count: productInfo.quantity,
					weight: productInfo.weight,
				});
			}

			localStorage.setItem('products', JSON.stringify(productsRaw));
			return { products: productsRaw };
		}),

	deleteProduct: (productId, aromaId) =>
		set((state) => {
			const productsRaw = [...state.products];
			const productIndex = productsRaw.findIndex(
				(product) =>
					product.productId === productId && product.aromaId === aromaId
			);

			if (productIndex >= 0) {
				productsRaw[productIndex].count -= 1;

				if (productsRaw[productIndex].count === 0) {
					productsRaw.splice(productIndex, 1);
				}
			}

			localStorage.setItem('products', JSON.stringify(productsRaw));

			return { products: productsRaw };
		}),
}));
