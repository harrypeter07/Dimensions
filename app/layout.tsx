import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
// import ScrollBall from "@/components/3d/ScrollBall";
import DroneViewer from "@/components/DroneViewer";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DroneProvider } from "@/components/DroneContext";
import ParticlesClient from "@/components/ParticlesClient";

const anton = Anton({
	variable: "--font-anton",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "AXIS 25 - Tech Festival",
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
			<body
				className={` ${anton.variable} font-anton antialiased relative min-h-screen flex flex-col`}
			>
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
						<main className="flex-grow">{children}</main>
					</DroneProvider>
				</ThemeProvider>
				<Footer />
			</body>
		</html>
	);
}
