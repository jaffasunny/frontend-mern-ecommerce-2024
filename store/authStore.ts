import { create } from "zustand";
import { AuthAction, AuthState } from "@/types";
import { persist } from "zustand/middleware";
import { LoginAPI, LogoutAPI, SignupAPI } from "@/utils/Apis";

export const useAuthStore = create<AuthState & AuthAction>()(
	persist(
		(set, get) => ({
			user: {},
			isAuthenticated: false,
			loading: false,
			error: null,

			login: async (username: string, password: string) => {
				try {
					set({ loading: true, error: null });

					let response = await LoginAPI(username, password);

					if (response === "Network Error") {
						set({
							loading: false,
							user: {},
							error: response,
							isAuthenticated: false,
						});

						return response;
					} else {
						set({ loading: false, user: response, isAuthenticated: true });

						return response;
					}
				} catch (error) {
					console.log("Error in login", error);
					set({ error: error || "An error occurred" });
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
							user: {},
							error: response,
							isAuthenticated: false,
						});

						return response;
					} else {
						set({ loading: false, user: response, isAuthenticated: true });

						return response;
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
						set({ loading: false, user: {}, isAuthenticated: false });
					}
				} catch (error) {
					console.log({ error });
				}
			},
		}),
		{
			name: "auth", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
