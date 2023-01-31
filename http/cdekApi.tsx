import { $host } from './index';

interface Request {
	to_address: string,
	weight: string
}

interface DeliveryInfo {
	total_sum: number,
	period_min: number,
	period_max: number
}


export const calculateDelivery = async (body: Request) => {
	const { data } = await $host.post<DeliveryInfo>('api/cdek/calculate', body);
	return data;
};