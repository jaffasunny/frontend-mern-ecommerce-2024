import { AuthResponse } from "@/types";
import { DEV_BASE_URL, PROD_BASE_URL } from "@/utils/constant";
import axios from "axios";

interface LOGIN_API_TYPES {
	fnType: (
		emailOrUsername: string,
		password: string
	) => Promise<void | AuthResponse>;
}

interface SIGNUP_API_TYPES {
	fnType: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<void | AuthResponse>;
}

export const LoginAPI: LOGIN_API_TYPES["fnType"] = async (
	emailOrUsername,
	password
) => {
	try {
		const response = await axios.post<AuthResponse>(
			PROD_BASE_URL + "/users/login",
			{
				emailOrUsername,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("error message: ", error.message);
		} else {
			console.log("unexpected error: ", error);
		}
	}
};

export const SignupAPI: SIGNUP_API_TYPES["fnType"] = async (
	firstName,
	lastName,
	username,
	email,
	password
) => {
	try {
		const response = await axios.post<AuthResponse>(
			DEV_BASE_URL + "/users/register",
			{
				firstName,
				lastName,
				username,
				email,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("error message: ", error.message);
		} else {
			console.log("unexpected error: ", error);
		}
	}
};
