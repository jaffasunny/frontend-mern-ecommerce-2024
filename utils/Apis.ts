import {
	LOGIN_API_TYPES,
	SIGNUP_API_TYPES,
	TAddToCartAPIBody,
	TGetProductAPI,
	TGetSingleProductAPI,
	TRefreshTokenResponse,
	TUserType,
} from "@/types";
import { DEV_BASE_URL, PROD_BASE_URL } from "@/utils/constant";
import axios from "axios";

export const LoginAPI: LOGIN_API_TYPES["fnType"] = async (
	emailOrUsername,
	password
) => {
	try {
		const response = await axios.post(
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
		console.error("Login error:", error);
	}
};

export const RefreshAccessTokenAPI = async (user: TUserType) => {
	try {
		const response = await axios.post<TRefreshTokenResponse>(
			PROD_BASE_URL + "/users/refreshToken",
			{
				refreshToken: user?.data?.refreshToken,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ RefreshAccessTokenAPI ~ error:", error);
	}
};

export const LogoutAPI = async (user: TUserType) => {
	try {
		const response = await axios.post(PROD_BASE_URL + "/users/logout", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
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
		const response = await axios.post(
			PROD_BASE_URL + "/users/register",
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
		return error;
	}
};

export const GetProductAPI = async (user: TUserType) => {
	try {
		const response = await axios.get<TGetProductAPI>(
			PROD_BASE_URL + "/products",
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const GetSingleProductAPI = async (
	user: TUserType,
	id: string | string[]
) => {
	try {
		const response = await axios.get<TGetSingleProductAPI>(
			PROD_BASE_URL + `/products/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const GetCartAPI = async (user: TUserType) => {
	try {
		const response = await axios.get(PROD_BASE_URL + "/carts", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const AddToCartAPI = async (
	user: TUserType,
	body: TAddToCartAPIBody
) => {
	try {
		const response = await axios.post(PROD_BASE_URL + "/carts", body, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${user.data.accessToken}`,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};

export const RemoveItemFromCartApi = async (
	user: TUserType,
	cartItemId: string
) => {
	try {
		const response = await axios.delete(
			PROD_BASE_URL + "/carts/" + cartItemId,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${user.data.accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error: any) {
		if (error.response.status === 401) {
			const response = await RefreshAccessTokenAPI(user);

			return response;
		}
		console.log(error);
	}
};
