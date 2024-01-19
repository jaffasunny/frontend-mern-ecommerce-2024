import { create } from "zustand";
import { AuthAction, AuthState, UserLoginResponse } from "@/types";
import axios from "axios";
import { DEV_BASE_URL, PROD_BASE_URL } from "@/utils/constant";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState & AuthAction>()(
	persist(
		(set) => ({
			user: {},
			isAuthenticated: false,
			login: async (username: string, password: string) => {
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
					console.log("🚀 ~ login: ~ response:", response);

					set({ user: response.data, isAuthenticated: true });

					return response.data;
				} catch (error) {
					// Handle network or request errors
					if (axios.isAxiosError(error)) {
						console.log("error message: ", error.message);
						// 👇️ error: AxiosError<any, any>
						return error.message;
					} else {
						console.log("unexpected error: ", error);
						return "An unexpected error occurred";
					}
				}
			},
			logout: () => {
				set({ user: {}, isAuthenticated: false });
			},
		}),
		{
			name: "auth", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
