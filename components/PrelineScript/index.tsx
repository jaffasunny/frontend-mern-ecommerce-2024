/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { usePathname } from "next/navigation";
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
			window.HSStaticMethods.autoInit();
		}, 1000);
	}, [path]);

	return null;
}
