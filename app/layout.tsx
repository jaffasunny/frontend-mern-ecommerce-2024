import type { Metadata } from "next";
import "./globals.css";

import PrelineScript from "@/components/PrelineScript";
import Script from "next/script";
import ToastifyWrapper from "@/components/ToastifyWrapper";

export const metadata: Metadata = {
	title: "Chicify",
	description: "A site created by Jaffa!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='h-full'>
			<body>
				<ToastifyWrapper>{children}</ToastifyWrapper>
			</body>
			<PrelineScript />
			<Script src='https://use.fontawesome.com/03f8a0ebd4.js' />
			<Script
				type='module'
				src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'
			/>
			<Script
				noModule
				src='https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
			/>
		</html>
	);
}
