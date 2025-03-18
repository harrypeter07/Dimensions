import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
// import ScrollBall from "@/components/3d/ScrollBall";
import DroneViewer from "@/components/DroneViewer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DroneProvider } from "@/components/DroneContext";
import ParticlesClient from "@/components/ParticlesClient";

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
			<body className={` ${roboto.variable} antialiased relative min-h-screen`}>
				<div className="fixed inset-0 w-full h-full pointer-events-none">
					<ParticlesClient
						particleColors={["#ffffff", "#000000"]}
						particleCount={100}
						particleSpread={10}
						speed={0.1}
						particleBaseSize={100}
						moveParticlesOnHover={true}
						alphaParticles={false}
						disableRotation={false}
						className="absolute inset-0 w-full h-full bg-black -z-10"
					/>
				</div>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<DroneProvider>
						<DroneViewer modelPath="/models/drone.glb" />

						<Navbar />
						{children}
						<Footer />
					</DroneProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
