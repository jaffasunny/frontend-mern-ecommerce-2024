import { TUser } from "./../cartTypes/index";

export type TOrderItemType = {
	items: {
		product: {
			_id: string;
			productName: string;
			category: string[];
			description: string;
			image: string;
			rating: {
				average: number;
				count: number;
				_id: string;
			};
			sellerId: string;
			price: number;
			quantity: number;
			createdAt: Date;
			updatedAt: Date;
			__v: number;
		};
		quantity: number;
		_id: string;
	}[];
	totalPrice: number;
	_id: string;
};

export type TOrderType = {
	data: {
		_id: string;
		users: TUser;
		cart: TOrderItemType;
		status: string;
		createdAt: Date;
		updatedAt: Date;
		__v: number;
	}[];
	message: string;
	statusCode: number | null;
	success: boolean;
} | null;

export type OrderAction = {
	addOrder: (body: any) => Promise<void>;
	getOrder: () => Promise<void>;
	clearPendingOrder: (body: any) => Promise<void>;
};

export type OrderState = {
	order: TOrderType;
	loading: boolean;
	error: unknown;
	apiResponse: object | null;
};
