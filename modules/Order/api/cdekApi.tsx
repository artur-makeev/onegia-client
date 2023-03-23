import { $host } from '../../../api/index';
import type { ProductsWithIds } from '../../../models/Models';

interface Request {
	to_address: string;
	packageProducts: ProductsWithIds;
}

interface DeliveryInfo {
	total_sum: number;
	period_min: number;
	period_max: number;
}

export const calculateDelivery = async (body: Request) => {
	const { data } = await $host.post<DeliveryInfo>('api/cdek/calculate', body);
	return data;
};
