"use client";
import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Drone } from "./Drone";
import { useDroneContext } from "./DroneContext";
import { useScroll, useMotionValueEvent } from "framer-motion";

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

	useFrame((_, delta) => {
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
function EnhancedDrone() {
	return (
		<group>
			<Drone castShadow />
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
	modelPath?: string;
	autoRotate?: boolean;
	showEnvironment?: boolean;
	showGrid?: boolean;
}

export default function DroneViewer({
	modelPath = "",
	autoRotate = false,
	showEnvironment = true,
	showGrid = false,
}: DroneViewerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const {
		canvasSize,
		canvasPosition,
		updateCanvasSize,
		updateCanvasPosition,
		updateDroneScale,
	} = useDroneContext();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const { scrollYProgress } = useScroll();

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const isCenter = latest < 0.15
		const size = {
			width: isCenter ? (isMobile ? "40%" : "40%") : isMobile ? "50%" : "50%",
			height: isCenter ? (isMobile ? "30%" : "40%") : isMobile ? "30%" : "50%",
		};
   let position = { top: "10%", right: "50%", transform: "translate(50%, -50%)" };
    if(isCenter){
  
    
         position = 
           { top: "60%", right: isMobile ? "20%" : "10%", transform: "none" };
    }
   if(latest > 0.35 && latest < 0.50){
    updateCanvasPosition({ top: "60%", right: "10%", transform: "translate(50%, -50%)" });
   }
   if(latest > 0.60 ){
    updateCanvasPosition({ top: "10%", right: "50%", transform: "translate(50%, -50%)" });
   }
		updateCanvasSize(size);
		updateCanvasPosition(position);
		updateDroneScale(isCenter ? 0.40 : 0.45);
	});

	useEffect(() => {
		updateCanvasSize({
			width: isMobile ? "50%" : "50%",
			height: isMobile ? "30%" : "50%",
		});
		updateCanvasPosition({ top: "5%", right: isMobile ? "1%" : "0%" });
	}, [isMobile, updateCanvasSize, updateCanvasPosition]);

	return (
		<div
			ref={containerRef}
			className="fixed transform-gpu pointer-events-none"
			style={{
				zIndex: 80,
				background: "transparent",
				height: canvasSize.height,
				width: canvasSize.width,
				top: canvasPosition.top,
				right: canvasPosition.right,
				transform: canvasPosition.transform,
				willChange: "transform",
				transition: "all 0.5s ease-out",
			}}
		>
			<Canvas
				shadows
				camera={{
					position: isMobile ? [0, 0, 6] : [0, 0, 5],
					fov: isMobile ? 55 : 45,
				}}
				gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
				style={{ background: "transparent", position: "absolute" }}
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
							<ambientLight intensity={0.7} />
							<directionalLight
								position={[5, 5, 5]}
								intensity={2}
								castShadow
								shadow-mapSize={[1024, 1024]}
								shadow-bias={-0.0001}
							/>
							<spotLight
								position={[-5, 2, -3]}
								angle={0.5}
								penumbra={0.8}
								intensity={1.5}
								color="#ffffff"
								castShadow
							/>
							<EnhancedDrone />
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
							<Model url={modelPath} autoRotate={autoRotate} />
						</>
					)}
				</Suspense>
				{showGrid && <gridHelper args={[10, 10]} />}
				<OrbitControls
					enableZoom={false}
					enableRotate={false}
					minPolarAngle={Math.PI / 2 - 0.3}
					maxPolarAngle={Math.PI / 2 + 0.3}
				/>
			</Canvas>
		</div>
	);
}