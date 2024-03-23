export const PROD_BASE_URL =
	"https://nebulous-languid-hygienic.glitch.me/api/v1";
export const DEV_BASE_URL = "http://localhost:8000/api/v1";

export const DEFAULT_VALUES = {
	user: {
		data: {
			accessToken: "",
			refreshToken: "",
			user: {
				email: "",
				firstName: "",
				lastName: "",
				username: "",
			},
		},
		message: "",
		statusCode: null,
		success: false,
	},
};
