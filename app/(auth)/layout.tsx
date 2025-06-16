import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Threads App",
	description: "A modern threads application for sharing and discussion.",
	openGraph: {
		title: "Threads App",
		description: "A modern threads application for sharing and discussion.",
		siteName: "Threads App",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Threads App",
		description: "A modern threads application for sharing and discussion.",
	},
};
const inter = Inter({subsets : ["latin"]});

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<head />
				<body className={`${inter.className} bg-dark-1`}>{children}</body>
			</html>
		</ClerkProvider>
	);
}