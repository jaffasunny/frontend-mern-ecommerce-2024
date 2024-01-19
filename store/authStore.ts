import { create } from "zustand";
import { AuthAction, AuthState } from "@/types";
import { persist } from "zustand/middleware";
import { LoginAPI } from "@/utils/Apis";

export const useAuthStore = create<AuthState & AuthAction>()(
	persist(
		(set) => ({
			user: {},
			isAuthenticated: false,
			login: async (username: string, password: string) => {
				let response = await LoginAPI(username, password);

				if (response) {
					set({ user: response, isAuthenticated: true });

					return response;
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
