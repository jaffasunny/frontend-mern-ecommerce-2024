export interface AuthResponse {
	statusCode: string;
	user: object;
	message: string;
	success: boolean;
	apiResponse: object;
}

export interface AuthError {
	statusCode: string;
	user: object;
	message: string;
	success: boolean;
	errors: [];
}

export type TUserType = {
	data: {
		accessToken: string;
		refreshToken: string;
		user: object;
	};
	message: string;
	statusCode: number | null;
	success: boolean;
};

export interface AuthState {
	user: TUserType;
	isAuthenticated: boolean;
	loading: boolean;
	error: null | string | object;
	apiResponse: object | null;
}

export interface AuthAction {
	login: (
		emailOrUsername: string,
		password: string
	) => Promise<TUserType | undefined | string>;
	signup: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	logout: () => void;
	refreshAccessToken: (
		newRefreshTokenAndAccessToken:
			| {
					accessToken: string;
					refreshToken: string;
			  }
			| object[]
	) => void;
	clearApiResponse: () => void;
}

export interface LoginTypes {
	HandleSubmitType: (
		emailOrUsername: string,
		password: string
	) => Promise<void>;
	FormValueType: {
		emailOrUsername: string;
		password: string;
	};
}

export interface SignupTypes {
	HandleSubmitType: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	FormValueType: {
		firstName: string;
		lastName: string;
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
		radioButton: boolean;
	};
}

export interface LOGIN_API_TYPES {
	fnType: (
		emailOrUsername: string,
		password: string
	) => Promise<
		| { accessToken: string; refreshToken: string; user: object }
		| undefined
		| string
	>;
}

export interface SIGNUP_API_TYPES {
	fnType: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<object | string>;
}

export type TGetProductAPI = {
	data: {
		_id: string;
		image: string;
		productName: string;
	}[];
	message: string;
	statusCode: number;
	success: boolean;
};

export type TGetSingleProductAPI = {
	data: {
		_id: string;
		productName: string;
		category?: string[];
		description: string;
		image: string;
		rating?: {
			average: number;
			count: number;
			_id: string;
		};
		sellerId?: {
			_id: string;
			firstName: string;
			lastName: string;
			username: string;
			email: string;
			roles: string[];
			isProfileComplete: boolean;
			createdAt: string;
			updatedAt: string;
		};
		price: number;
		quantity?: number;
		createdAt?: string;
		updatedAt?: string;
	};
	message: string;
	statusCode: number;
	success: boolean;
};

export type TRefreshTokenAPI = (
	user: TUserType
) => Promise<TRefreshTokenResponse>;

export type TRefreshTokenResponse = {
	statusCode: number;
	data: {
		accessToken: string;
		refreshToken: string;
	};
	message: string;
	success: boolean;
};
