import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { BasketProduct } from '../../../models/Models';

interface BasketState {
	products: BasketProduct[]
	loaded: boolean
	setProducts: (products: BasketProduct[]) => void,
	setLoaded: (value: boolean) => void,
	addProduct: (
		productId: number,
		productName: string,
		price: number,
		img: string,
		aromaId: number,
		aromaName: string,
		quantity: number,
		weight: number
	) => void,
	deleteProduct: (productId: number, aromaId: number) => void
}

export const useBasketStore = create<BasketState>()(
	devtools(
		persist(
			(set) => ({
				products: [],
				loaded: false,

				setLoaded: (value) => set(() => ({ loaded: value })),

				setProducts: (products) => set(() => ({ products: products })),

				addProduct: (
					productId,
					productName,
					price,
					img,
					aromaId,
					aromaName,
					quantity,
					weight
				) => set((state) => {
					const productsRaw = [...state.products];
					const existingProduct = productsRaw.findIndex((product) => {
						return product.productId === productId && product.aromaId === aromaId;
					});

					if (existingProduct >= 0) {
						productsRaw[existingProduct].count += 1;
					} else {
						productsRaw.push({
							"productId": productId,
							"name": productName,
							"price": price,
							"img": img,
							"aromaId": aromaId,
							"aromaName": aromaName,
							"count": quantity,
							"weight": weight
						});
					}

					localStorage.setItem('products', JSON.stringify(productsRaw));
					return { products: productsRaw };
				}),

				deleteProduct: (productId, aromaId) => set((state) => {
					const productsRaw = [...state.products];
					const productIndex = productsRaw.findIndex((product) => {
						return product.productId === productId && product.aromaId === aromaId;
					});

					if (productIndex >= 0) {
						productsRaw[productIndex].count -= 1;

						if (productsRaw[productIndex].count === 0) {
							productsRaw.splice(productIndex, 1);
						}
					}

					localStorage.setItem('products', JSON.stringify(productsRaw));

					return { products: productsRaw };
				})
			}),
			{
				name: 'basket-storage',
			}
		)
	)
);