import { RemoveItemFromCartApi } from "./../utils/Apis";
import { useAuthStore } from "@/store/authStore";
import { DEFAULT_VALUES } from "./../utils/constant";
import { create } from "zustand";
import { CartState, CartAction } from "@/types";
import { persist } from "zustand/middleware";
import { AddToCartAPI, GetCartAPI } from "@/utils/Apis";

export const useCartStore = create<CartState & CartAction>()(
	persist(
		(set, get) => ({
			cart: null,
			cartCount: 0,
			loading: false,
			processLoading: false,
			error: null,
			apiResponse: null,

			getCart: async () => {
				try {
					set({ loading: true, error: null });

					let response = await GetCartAPI(useAuthStore.getState().user);

					if (response?.message === "Access token refreshed successfully!") {
						useAuthStore.getState().refreshAccessToken(response.data);
					} else {
						if (response === "Network Error") {
							set({
								loading: false,
								cart: null,
								error: response,
							});
						} else {
							set({
								loading: false,
								cart: response,
								error: {},
								cartCount: response?.data[0]?.items.length,
							});
						}
					}
				} catch (error) {
					console.log({ error });
				}
			},

			addToCart: async (body) => {
				try {
					set({ processLoading: true, error: null });

					let response = await AddToCartAPI(useAuthStore.getState().user, body);

					if (response === "Network Error") {
						set({
							processLoading: false,
							cart: null,
							error: response,
						});
					} else {
						set({
							processLoading: false,
							error: {},
							apiResponse: response,
						});
					}
				} catch (error) {
					console.log({ error });
				}
			},

			removeItemFromCart: async (cartItemId) => {
				try {
					console.log("removing an item");
					set({ processLoading: true, error: null });

					let response = await RemoveItemFromCartApi(
						useAuthStore.getState().user,
						cartItemId
					);

					if (response) {
						set({
							processLoading: false,
							error: {},
							apiResponse: response,
						});
					} else {
						set({
							processLoading: false,
							cart: null,
							error: response,
						});
					}
				} catch (error) {
					console.log({ error });
					set({
						processLoading: false,
						error: error,
					});
				}
			},

			increaseCartCount: () => set({ cartCount: get().cartCount + 1 }),
			decreaseCartCount: () => set({ cartCount: get().cartCount - 1 }),
			setCartCount: (count) => set({ cartCount: count }),

			clearApiResponse: () => set({ apiResponse: null }),
		}),
		{
			name: "cart", // name of the item in the storage (must be unique)
			skipHydration: true,
		}
	)
);
