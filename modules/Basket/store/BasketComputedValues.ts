import { ProductsWithIds } from '../../../models/Models';
import { useBasketStore } from './BasketStore';


export const useBasketProductsQuantity = () => {
	const basketProducts = useBasketStore(state => state.products);
	let count = 0;

	basketProducts.forEach((product) => {
		count += product.count;
	});

	return [count];
};

export const useBasketTotalPrice = () => {
	const basketProducts = useBasketStore(state => state.products);
	let priceCounter = 0;

	basketProducts.forEach((product) => {
		priceCounter += (product.price * product.count);
	});

	return [priceCounter];
};

export const useProductsIdsWithCount = () => {
	const basketProducts = useBasketStore(state => state.products);
	const productsIdsWithCount: ProductsWithIds = {};

	basketProducts.forEach((p) => {
		productsIdsWithCount[`${p.productId}`] = p.count;
	});
	return [productsIdsWithCount];
};