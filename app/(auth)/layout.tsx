import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sign In or Register | Threads Auth",
	description: "Access your Threads account or create a new one. Secure authentication for the Threads social platform.",
	keywords: ["Threads", "Authentication", "Sign In", "Register", "Login", "Social Platform", "Account"],
	openGraph: {
		title: "Sign In or Register | Threads Auth",
		description: "Access your Threads account or create a new one. Secure authentication for the Threads social platform.",
		siteName: "Threads",
		type: "website",
	},
	robots: "index, follow",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-dark-1`}>
				<ClerkProvider
					appearance={{
						baseTheme: dark,
					}}>
					{children}
				</ClerkProvider>
			</body>
		</html>
	);
}
