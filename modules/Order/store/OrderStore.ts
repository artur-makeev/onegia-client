import { create } from 'zustand';
import { BasketProduct, ClientInfo, ShippingType } from '../../../models/Models';

interface OrderState {
	id: number,
	confirmed: boolean,
	products: BasketProduct[],
	clientInfo: ClientInfo,
	deliveryPrice: number,
	deliveryTime: number,
	shippingType: ShippingType,
	setId: (pk: number) => void,
	setProducts: (products: BasketProduct[]) => void,
	setClientInfo: (clientInfo: ClientInfo) => void,
	setDeliveryPrice: (price: number) => void,
	setDeliveryTime: (time: number) => void,
	setShippingType: (type: ShippingType) => void
}

export const useOrderStore = create<OrderState>()(
	(set) => ({
		id: 0,
		confirmed: false,
		products: [],
		clientInfo: {
			lastName: '',
			firstName: '',
			fatherName: '',
			email: '',
			phone: '',
			address: '',
			contact: ''
		},
		deliveryPrice: 0,
		deliveryTime: 0,
		shippingType: '',

		setId: (pk) => set(() => ({ id: pk })),

		setProducts: (products) => set(() => ({ products: products })),

		setClientInfo: (clientInfo) => set(() => ({ clientInfo: clientInfo })),

		setDeliveryPrice: (price) => set(() => ({ deliveryPrice: price })),

		setDeliveryTime: (time) => set(() => ({ deliveryTime: time })),

		setShippingType: (type) => set(() => ({ shippingType: type }))
	}),
);