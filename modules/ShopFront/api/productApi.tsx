import { $host } from '../../../api/index';


export const fetchCategories = async () => {
	const { data } = await $host.get('api/category');
	return data;
};

export const fetchProducts = async (categoryId: number | null, page: number, limit: number) => {
	const { data } = await $host.get('api/product', {
		params: {
			categoryId, page, limit
		}
	});
	return data;
};


