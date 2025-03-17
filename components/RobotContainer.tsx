import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import { Model as Robot } from "./Robot";

interface RobotRef {
	actions: {
		Scene?: {
			reset: () => void;
			fadeIn: (duration: number) => void;
			play: () => void;
		};
	};
}

const LoadingScreen = () => {
	const { progress } = useProgress();
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				color: "white",
				fontSize: "1.5em",
			}}
		>
			Loading... {progress.toFixed(0)}%
		</div>
	);
};

const RobotContainer: React.FC = () => {
	const robotRef = useRef<RobotRef>(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		try {
		  if (robotRef.current && robotRef.current.actions) {
			const { actions } = robotRef.current;
			
			// Add a small delay to ensure the actions are ready
			setTimeout(() => {
			  if (actions?.Scene) {
				actions.Scene.reset();
				actions.Scene.play();
				setIsAnimating(true);
				setError(null);
			  } else {
				setError("Animation not found");
			  }
			}, 100);
		  }
		} catch (err) {
		  setError(
			`Failed to start animation: ${
			  err instanceof Error ? err.message : "Unknown error"
			}`
		  );
		  console.error("Animation error:", err);
		}
	  }, []); 

	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				position: "relative",
				backgroundColor: "#121212",
			}}
		>
			<Canvas shadows camera={{ position: [0, 5, 8], fov: 50 }}>
				<Suspense fallback={<LoadingScreen />}>
					{/* Lighting setup */}
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} intensity={1} castShadow />
					<pointLight
						position={[-10, -10, -10]}
						color="#2020ff"
						intensity={0.5}
					/>

					{/* Robot with ref to access animations */}
					<Robot ref={robotRef} />
				</Suspense>

				{/* OrbitControls with up/down movement */}
				<OrbitControls
					enableZoom={false}
					enableRotate={true}
					minPolarAngle={Math.PI / 2 - 0.3}
					maxPolarAngle={Math.PI / 2 + 0.3}
					minAzimuthAngle={-Infinity}
					maxAzimuthAngle={Infinity}
				/>
			</Canvas>

			{/* Status indicators */}
			{error ? (
				<div
					style={{
						position: "absolute",
						bottom: 20,
						left: 20,
						backgroundColor: "rgba(255,0,0,0.7)",
						color: "white",
						padding: "8px 16px",
						borderRadius: 4,
					}}
				>
					Error: {error}
				</div>
			) : (
				isAnimating && (
					<div
						style={{
							position: "absolute",
							bottom: 20,
							left: 20,
							backgroundColor: "rgba(0,0,0,0.7)",
							color: "white",
							padding: "8px 16px",
							borderRadius: 4,
						}}
					>
						Playing: Scene Animation
					</div>
				)
			)}
		</div>
	);
};

export default RobotContainer;
