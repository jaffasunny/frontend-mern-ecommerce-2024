export interface AuthResponse {
	statusCode: string;
	data: object;
	message: string;
	success: boolean;
}

export interface AuthState {
	user: object;
	isAuthenticated: boolean;
}

export interface AuthAction {
	login: (
		emailOrUsername: string,
		password: string
	) => Promise<AuthResponse | string | void>;
	signup: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<AuthResponse | string | void>;
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
