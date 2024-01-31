import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface WithHeaderFooterProps<P> {
	children: React.ReactNode;
	props: P;
}

export default function withHeaderFooter<P extends object>(
	Component: React.ComponentType<{ children: React.ReactNode; props: P }>
): React.FC<WithHeaderFooterProps<P>> {
	return function WithHeaderFooter({
		children,
		...props
	}: WithHeaderFooterProps<P>) {
		return (
			<div className='bg-[#F2F0F1] '>
				<Header />
				<Component {...props}>{children}</Component>
				<Footer />
			</div>
		);
	};
}
