import { $host } from '../../../api/index';

export const fetchAromas = async (productId: number) => {
	const { data } = await $host.get('api/aroma/' + productId);
	return data;
};

export const fetchAromaInfos = async (aromaId: number) => {
	const { data } = await $host.get('api/aroma/info/' + aromaId);
	return data;
};
