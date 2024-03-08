export type TItemType = {
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
	totalPrice: number;
	quantity: number;
	_id: string;
};

export type TUser = {
	user: {
		_id: string;
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		password: string;
		roles: string[];
		isProfileComplete: false;
		createdAt: string;
		updatedAt: string;
		__v: 75;
		refreshTokens: [
			{
				token: string;
				_id: string;
			},
			{
				token: string;
				_id: string;
			}
		];
	};
};

export type TCartType = {
	data: {
		_id: string;
		users: TUser;
		items: TItemType[];
		totalPrice: number;
		createdAt: Date;
		updatedAt: Date;
		__v: number;
	}[];
	message: string;
	statusCode: number | null;
	success: boolean;
} | null;

export type CartState = {
	cart: TCartType;
	loading: boolean;
	processLoading: boolean;
	error: unknown;
	apiResponse: object | null;
	cartCount: number;
};

export type TAddToCartAPIBody = {
	product: string;
	quantity: number;
};

export type CartAction = {
	getCart: () => Promise<void>;
	addToCart: (body: TAddToCartAPIBody) => Promise<void>;
	removeItemFromCart: (cartItemId: string) => Promise<void>;
	increaseCartCount: () => void;
	decreaseCartCount: () => void;
	setCartCount: (count: number) => void;
};
