import { TEditProfileBody } from "./../types/authTypes/index";
import { DEFAULT_VALUES } from "./../utils/constant";
import { create } from "zustand";
import { AuthAction, AuthState } from "@/types";
import { persist } from "zustand/middleware";
import {
	LoginAPI,
	LogoutAPI,
	ResetPasswordToken,
	SignupAPI,
	ResetPassword,
	EditProfile,
} from "@/utils/Apis";

export const useAuthStore = create<AuthState & AuthAction>()(
	persist(
		(set, get) => ({
			user: DEFAULT_VALUES.user,
			isAuthenticated: false,
			loading: false,
			error: null,
			apiResponse: null,

			login: async (emailOrUsername: string, password: string) => {
				try {
					set({ loading: true, error: null });

					let response = await LoginAPI(emailOrUsername, password);

					if (typeof response !== "string" && response) {
						set({
							loading: false,
							user: {
								data: response.data,
								message: response.message,
								statusCode: response.statusCode,
								success: response.success,
							},
							isAuthenticated: true,
						});
					} else {
						set({
							loading: false,
							user: DEFAULT_VALUES.user,
							error: response,
							isAuthenticated: false,
						});

						return response;
					}
				} catch (error) {
					set({ error: error || "An error occurred" });
				}
			},

			refreshAccessToken: async (newRefreshTokenAndAccessToken) => {
				let storedUser = get().user;
				const _refreshAndAccessToken = newRefreshTokenAndAccessToken as {
					accessToken: string;
					refreshToken: string;
				};

				if (
					typeof storedUser.data === "object" &&
					_refreshAndAccessToken.accessToken &&
					_refreshAndAccessToken.refreshToken
				) {
					storedUser.data.accessToken = _refreshAndAccessToken.accessToken;

					storedUser.data.refreshToken = _refreshAndAccessToken.refreshToken;

					set({ user: storedUser });
				} else {
					// Handle the case where storedUser.data is not an object with accessToken and refreshToken

					set({
						error:
							"storedUser.data is not an object with accessToken and refreshToken",
					});
				}
			},

			signup: async (
				firstName: string,
				lastName: string,
				username: string,
				email: string,
				password: string
			) => {
				try {
					set({ loading: true, error: null });

					let response = await SignupAPI(
						firstName,
						lastName,
						username,
						email,
						password
					);

					if (response === "Network Error") {
						set({
							loading: false,
							error: response,
						});
					} else {
						if (typeof response !== "string")
							set({ loading: false, apiResponse: response });
					}
				} catch (error) {
					console.log("Error in login", error);
					set({ error: error || "An error occurred" });
				}
			},

			logout: async () => {
				try {
					set({ loading: true, error: null });

					let response = await LogoutAPI(get().user);

					if (response === "Network Error") {
						set({
							loading: false,
							user: get().user,
							error: response,
							isAuthenticated: get().isAuthenticated,
						});
					} else {
						set({
							loading: false,
							user: DEFAULT_VALUES.user,
							isAuthenticated: false,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			resetPasswordToken: async (email: string) => {
				try {
					set({ loading: true, error: null });

					let response = await ResetPasswordToken(email);

					if (response) {
						set({
							loading: false,
							apiResponse: response.data,
						});
					} else {
						set({
							loading: false,
							error: response,
						});
					}
				} catch (error) {
					set({
						loading: false,
						error,
					});
				}
			},

			resetPassword: async (password, confirmPassword, userId, tokenId) => {
				try {
					set({ loading: true, error: null });

					let response = await ResetPassword(
						password,
						confirmPassword,
						userId,
						tokenId
					);

					if (response) {
						set({
							loading: false,
							apiResponse: response.data,
						});
					} else {
						set({
							loading: false,
							error: response,
						});
					}
				} catch (error) {
					set({
						loading: false,
						error,
					});
				}
			},

			updateUserProfile: async (body: TEditProfileBody) => {
				try {
					set({ loading: true, error: null });

					let response = await EditProfile(get().user, body);
				} catch (error) {
					set({ error: error || "An error occurred" });
				}
			},

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "auth", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
