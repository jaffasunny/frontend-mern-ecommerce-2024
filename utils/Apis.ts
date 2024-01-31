import { AuthResponse, LOGIN_API_TYPES, SIGNUP_API_TYPES } from "@/types";
import { DEV_BASE_URL, PROD_BASE_URL } from "@/utils/constant";
import axios from "axios";

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

		return response;
	} catch (error) {
		return error;
	}
};

export const LogoutAPI = async (user) => {
	try {
		const response = await axios.post(PROD_BASE_URL + "/users/logout", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.data.accessToken}`,
			},
		});

		return response;
	} catch (error) {
		return error;
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

		return response;
	} catch (error) {
		return error;
	}
};

export const GetProductAPI = async (user) => {
	try {
		const response = await axios.get(PROD_BASE_URL + "/products", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.data.accessToken}`,
			},
		});

		return response.data.data;
	} catch (error) {
		return error;
	}
};

export const GetSingleProductAPI = async (user, id) => {
	try {
		const response = await axios.get(PROD_BASE_URL + `/products/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.data.accessToken}`,
			},
		});

		return response.data.data;
	} catch (error) {
		return error;
	}
};
