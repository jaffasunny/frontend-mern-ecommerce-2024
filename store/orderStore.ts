import {
	ClearPendingOrder,
	CreateOrderApi,
	GetOrderAPI,
} from "./../utils/Apis";
import { useAuthStore } from "@/store/authStore";
import { create } from "zustand";
import { OrderState, OrderAction } from "@/types";
import { persist } from "zustand/middleware";

export const useOrderStore = create<OrderState & OrderAction>()(
	persist(
		(set, get) => ({
			order: null,
			loading: false,
			error: null,
			apiResponse: null,

			getOrder: async () => {
				try {
					set({ loading: true, error: null });

					let response = await GetOrderAPI(useAuthStore.getState().user);

					if (response?.message === "Access token refreshed successfully!") {
						useAuthStore.getState().refreshAccessToken(response.data);
					} else {
						if (!response) {
							set({
								loading: false,
								order: null,
								error: response,
							});
						} else {
							set({
								loading: false,
								order: response,
								error: {},
							});
						}
					}
				} catch (error) {
					console.log({ error });
				}
			},

			addOrder: async (body) => {
				try {
					set({ loading: true, error: null });

					let response = await CreateOrderApi(
						useAuthStore.getState().user,
						body
					);

					if (!response) {
						set({
							loading: false,
							order: null,
							error: response,
						});
					} else {
						set({
							loading: false,
							error: {},
							apiResponse: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			clearPendingOrder: async (body) => {
				try {
					set({ loading: true, error: null });

					let response = await ClearPendingOrder(useAuthStore.getState().user);

					if (!response) {
						set({
							loading: false,
							order: null,
							error: response,
						});
					} else {
						set({
							loading: false,
							error: {},
							apiResponse: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "order", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
