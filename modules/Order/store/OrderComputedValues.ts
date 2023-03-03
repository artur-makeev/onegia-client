import { BasketProduct } from '../../../models/Models';
import { useOrderStore } from './OrderStore';


export const useGetProductsPrice = () => {
	const orderProducts = useOrderStore(state => state.products);
	let priceCounter = 0;

	orderProducts.forEach((product: BasketProduct) => {
		priceCounter += (product.price * product.count);
	});

	return [priceCounter];
};

export const useGetProductsQuantity = () => {
	const orderProducts = useOrderStore(state => state.products);
	let count = 0;

	orderProducts.forEach((product: BasketProduct) => {
		count += product.count;
	});

	return [count];
};