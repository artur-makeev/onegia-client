import type { Product } from '../modules/ShopFront';

export interface ProductsResponse {
	count: number;
	rows: Product[];
}
