export interface AuthResponse {
	statusCode: string;
	user: object | unknown;
	message: string;
	success: boolean;
}

export interface AuthError {
	statusCode: string;
	user: object | unknown;
	message: string;
	success: boolean;
	errors: [];
}

export interface AuthState {
	user: object | unknown;
	isAuthenticated: boolean;
	loading: boolean;
	error: null | string | object;
}

export interface AuthAction {
	login: (emailOrUsername: string, password: string) => Promise<unknown>;
	signup: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<unknown>;
	logout: () => void;
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
	fnType: (emailOrUsername: string, password: string) => Promise<unknown>;
}

export interface SIGNUP_API_TYPES {
	fnType: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<unknown>;
}
