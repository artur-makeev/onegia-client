import { $host } from '../../../api/index';


export const fetchAromaCategories = async (categoryId: number) => {
	const { data } = await $host.get('api/aroma/' + categoryId);
	return data;
};

export const fetchAromas = async (aromaCategoryId: number) => {
	const { data } = await $host.get('api/aroma/category/' + aromaCategoryId);
	return data;
};

export const fetchAromaInfos = async (aromaId: number) => {
	const { data } = await $host.get('api/aroma/info/' + aromaId);
	return data;
};


