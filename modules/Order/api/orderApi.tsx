import { $host } from '../../../api/index';

export const orderConfirm = async (order: FormData) => {
	const { data } = await $host.post('api/order', order);
	return data;
};
