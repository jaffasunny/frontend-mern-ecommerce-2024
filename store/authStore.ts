import { DEFAULT_VALUES } from "./../utils/constant";
import { create } from "zustand";
import { AuthAction, AuthState } from "@/types";
import { persist } from "zustand/middleware";
import { LoginAPI, LogoutAPI, SignupAPI } from "@/utils/Apis";

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

					if (response === "Network Error") {
						set({
							loading: false,
							user: DEFAULT_VALUES.user,
							error: response,
							isAuthenticated: false,
						});

						return response;
					} else if (typeof response !== "string" && response) {
						set({
							loading: false,
							user: response,
							isAuthenticated: true,
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

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "auth", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
