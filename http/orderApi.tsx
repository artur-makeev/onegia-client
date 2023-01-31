import { $host } from './index';


export const orderConfirm = async (order: FormData) => {
	const { data } = await $host.post('api/order', order);
	return data;
};
