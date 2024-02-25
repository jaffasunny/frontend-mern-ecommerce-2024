/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { usePathname } from "next/navigation";
import { HSStaticMethods } from "preline";
import { useEffect } from "react";

declare global {
	interface Window {
		HSStaticMethods: any;
	}
}

export default function PrelineScript() {
	const path = usePathname();
	useEffect(() => {
		import("preline/preline");
	}, []);

	useEffect(() => {
		setTimeout(() => {
			HSStaticMethods.autoInit();
		}, 1000);
	}, [path]);

	return null;
}
