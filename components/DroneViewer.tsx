"use client";
import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Drone } from "./Drone";
import { OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ModelProps {
	url: string;
	autoRotate?: boolean;
	scale?: number;
	position?: [number, number, number];
}

// Component for the 3D model with rotation and positioning options
function Model({
	url,
	autoRotate = false,
	scale = 1,
	position = [0, 0, 0],
}: ModelProps) {
	const modelRef = useRef<THREE.Group>(null);
	const { scene } = useGLTF(url);

	useFrame((state, delta) => {
		if (autoRotate && modelRef.current) {
			modelRef.current.rotation.y += delta * 0.5;
		}
	});

	return (
		<primitive
			ref={modelRef}
			object={scene}
			scale={scale}
			position={position}
			castShadow
			receiveShadow
		/>
	);
}

// Custom component for drone with enhanced visual effects
function EnhancedDrone({ scale = 1 }) {
	return (
		<group>
			{/* The drone itself - casting shadows */}
			<Drone scale={scale} castShadow />

			{/* Soft glow effect around the drone */}
			<pointLight
				position={[0, 0, 0]}
				intensity={2}
				distance={3}
				color="#88ccff"
			/>
		</group>
	);
}

interface DroneViewerProps {
	modelPath: string;
	autoRotate?: boolean;
	showEnvironment?: boolean;
	showGrid?: boolean;
	scale?: number;
	droneScale?: number;
	scrollDelay?: number;
}

export default function DroneViewer({
	modelPath,
	autoRotate = false,
	showEnvironment = true,
	showGrid = false,
	scale = 1,
	scrollDelay = 3.0,
}: DroneViewerProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (!containerRef.current) return;

		// Set initial position (above viewport)
		gsap.set(containerRef.current, {
			y: -150,
			x: 0,
			rotation: 0,
			opacity: 0,
		});

		// Initial entrance animation
		gsap.to(containerRef.current, {
			opacity: 1,
			y: 0,
			duration: 1.5,
			delay: 3.5,
			ease: "power3.out",
		});

		// Create the scroll-based animation with ScrollTrigger
		const scrollAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: document.body,
				start: "top 20%",
				end: "bottom 80%",
				scrub: isMobile ? 3 : 6, // Reduced delay for mobile
				onUpdate: (self) => {
					// Add bounce effect with reduced intensity for mobile
					const bounce =
						Math.sin(self.progress * Math.PI * 2) * (isMobile ? 0.1 : 0.15);

					// Calculate rotation based on scroll direction and speed
					const rotation = -self.getVelocity() / (isMobile ? 700 : 500);

					// Calculate horizontal movement with reduced range for mobile
					const horizontalMovement =
						Math.sin(self.progress * Math.PI * 3) * (isMobile ? 25 : 50);

					// Apply these effects with GSAP (with adjusted delay)
					gsap.to(containerRef.current, {
						y:
							self.progress * (isMobile ? 150 : 200) +
							bounce * (isMobile ? 30 : 50),
						x: horizontalMovement,
						rotation: rotation,
						duration: isMobile ? 3.6 : 4.8,
						ease: "elastic.out(1.2, 0.5)",
						overwrite: "auto",
						delay: isMobile ? 4 : 6,
					});

					// Return to neutral rotation when movement stops
					if (Math.abs(self.getVelocity()) < 10) {
						gsap.to(containerRef.current, {
							rotation: 0,
							duration: isMobile ? 0.9 : 1.2,
							ease: "elastic.out(1, 0.3)",
							overwrite: false,
						});
					}
				},
			},
		});

		// Cleanup function
		return () => {
			if (scrollAnimation.scrollTrigger) {
				scrollAnimation.scrollTrigger.kill();
			}
			scrollAnimation.kill();
		};
	}, [scrollDelay, isMobile]);

	return (
		<div
			ref={containerRef}
			className="fixed transform-gpu pointer-events-none"
			style={{
				zIndex: 80,
				background: "transparent",
				height: isMobile ? "30%" : "50%",
				width: isMobile ? "50%" : "50%",
				top: isMobile ? "5%" : "5%",
				right: isMobile ? "1%" : "-0%",
				willChange: "transform",
				transform: "translate3d(0, 0, 0)",
			}}
		>
			<Canvas
				shadows
				camera={{
					position: isMobile ? [0, 0, 6] : [0, 0, 5],
					fov: isMobile ? 55 : 45,
				}}
				gl={{
					alpha: true,
					antialias: true,
					preserveDrawingBuffer: true,
				}}
				style={{
					background: "transparent",
					position: "absolute",
				}}
				onCreated={({ gl, scene }) => {
					gl.setClearColor(0x000000, 0);
					scene.background = null;
					gl.shadowMap.enabled = true;
					gl.shadowMap.type = THREE.PCFSoftShadowMap;
				}}
			>
				<Suspense fallback={null}>
					{showEnvironment ? (
						<>
							{/* Ambient light for general illumination */}
							<ambientLight intensity={0.7} />

							{/* Main directional light with enhanced intensity */}
							<directionalLight
								position={[5, 5, 5]}
								intensity={2}
								castShadow
								shadow-mapSize={[1024, 1024]}
								shadow-bias={-0.0001}
							/>

							{/* Additional spot light from behind for rim lighting */}
							<spotLight
								position={[-5, 2, -3]}
								angle={0.5}
								penumbra={0.8}
								intensity={1.5}
								color="#ffffff"
								castShadow
							/>

							{/* Enhanced drone with lighting effects */}
							<EnhancedDrone scale={isMobile ? 0.35 : 0.65} />

							{/* Environment for reflections */}
							<Environment preset="sunset" background={false} />
						</>
					) : (
						<>
							<ambientLight intensity={0.7} />
							<spotLight
								position={[10, 10, 10]}
								angle={0.15}
								penumbra={1}
								intensity={2}
								castShadow
							/>
							<Model url={modelPath} autoRotate={autoRotate} scale={scale} />
						</>
					)}
				</Suspense>

				{showGrid && <gridHelper args={[10, 10]} />}
				<OrbitControls
  enableZoom={false}
  enableRotate={true}
  minPolarAngle={Math.PI / 2 - 0.3} // Allow some upward rotation
  maxPolarAngle={Math.PI / 2 + 0.3} // Allow some downward rotation
  minAzimuthAngle={-Infinity}
  maxAzimuthAngle={Infinity}
/>
			</Canvas>
		</div>
	);
}
