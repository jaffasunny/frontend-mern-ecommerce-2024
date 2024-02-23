"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Spinners from "../Spinners";

const isAuth = (Component: any) => {
	return function IsAuth(props: any) {
		const auth = useAuthStore((state) => state.isAuthenticated);
		const [hasHydrated, setHasHydrated] = useState(false);

		useEffect(() => {
			useAuthStore.persist.rehydrate();
			setHasHydrated(true);
		}, []);

		if (hasHydrated && auth) {
			redirect("/");
		}

		if (hasHydrated && auth) {
			return null;
		}

		return !hasHydrated ? <Spinners /> : <Component {...props} />;
	};
};

export default isAuth;
