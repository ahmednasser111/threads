import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import "../globals.css";

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
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}>
			<html lang="en" className="dark">
				<body className={`${inter.className}`}>
					<Topbar />

					<main className="flex flex-row">
						<LeftSidebar />
						<section className="main-container">
							<div className="w-full max-w-4xl">{children}</div>
						</section>
						<RightSidebar />
					</main>

					<Bottombar />
					<Toaster theme="dark" />
				</body>
			</html>
		</ClerkProvider>
	);
}
