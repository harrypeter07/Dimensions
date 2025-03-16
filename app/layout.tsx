import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
// import ScrollBall from "@/components/3d/ScrollBall";
import DroneViewer from "@/components/DroneViewer";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Dimensions - Tech Festival",
	description:
		"Experience the future of technology at our premier tech festival",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={` ${roboto.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<DroneViewer
						modelPath="/models/drone.glb"
						scrollDelay={2}
					/>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
