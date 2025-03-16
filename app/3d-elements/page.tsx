"use client";


import DroneViewer from "@/components/DroneViewer";

export default function ThreeDElements() {
	return (
		<main className="flex flex-col justify-between items-center p-24 min-h-screen bg-black">
			<DroneViewer modelPath="/models/drone.glb"/>
		</main>
	);
}
