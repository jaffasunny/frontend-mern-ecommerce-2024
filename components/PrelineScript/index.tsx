"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
import { HSStaticMethods } from "preline";
declare global {
	interface Window {
		HSStaticMethods: IStaticMethods;
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
		}, 100);
	}, [path]);

	return null;
}
