import { UserLoginResponse } from "@/types";
import { DEV_BASE_URL, PROD_BASE_URL } from "@/utils/constant";
import axios from "axios";

interface LOGIN_API_TYPES {
	fnType: (
		username: string,
		password: string
	) => Promise<void | UserLoginResponse>;
}

export const LoginAPI: LOGIN_API_TYPES["fnType"] = async (
	username,
	password
) => {
	try {
		const response = await axios.post<UserLoginResponse>(
			PROD_BASE_URL + "/users/login",
			{
				username,
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
