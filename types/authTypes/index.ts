export interface UserLoginResponse {
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
		username: string,
		password: string
	) => Promise<UserLoginResponse | string | void>;
	logout: () => void;
}

export interface LoginTypes {
	HandleSubmitType: (event: React.FormEvent<Element>) => Promise<void>;
	FormValueType: {
		username: string;
		password: string;
	};
}
