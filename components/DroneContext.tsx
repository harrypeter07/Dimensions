// DroneContext.tsx
"use client";
import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useRef,
} from "react";
import { gsap } from "gsap";

interface DroneContextType {
	droneScale: number;
	dronePosition: [number, number, number];
	canvasSize: { width: string; height: string };
	canvasPosition: { top: string; right: string; transform?: string };
	animationSpeed: number;
	isVisible: boolean;
	updateDroneScale: (scale: number) => void;
	updateDronePosition: (position: [number, number, number]) => void;
	updateCanvasSize: (size: { width: string; height: string }) => void;
	updateCanvasPosition: (position: { top: string; right: string; transform?: string }) => void;
	updateAnimationSpeed: (speed: number) => void;
	setDroneVisibility: (visible: boolean) => void;
}

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export const DroneProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Create refs for animation values
	const droneScaleRef = useRef<{ value: number }>({ value: 0.4 });
	const dronePositionRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
	const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 50, height: 50 });
	const canvasPositionRef = useRef<{ top: number; right: number , left:number}>({ top: 5, right: 0 , left:0 });
	
	// State to trigger renders
	const [droneScale, setDroneScale] = useState(0.4);
	const [dronePosition, setDronePosition] = useState<[number, number, number]>([0, 0, 0]);
	const [canvasSize, setCanvasSize] = useState({ width: "50%", height: "50%" });
	const [canvasPosition, setCanvasPosition] = useState({
		top: "5%",
		right: "0%",
	});
	const [animationSpeed, setAnimationSpeed] = useState(1);
	const [isVisible, setIsVisible] = useState(true);

	const updateDroneScale = useCallback((scale: number) => {
		// Create a tween for the scale
		gsap.to(droneScaleRef.current, {
			value: scale,
			duration: 1,
			ease: "power2.out",
			onUpdate: () => {
				setDroneScale(droneScaleRef.current.value);
			}
		});
	}, []);

	const updateDronePosition = useCallback((position: [number, number, number]) => {
		gsap.to(dronePositionRef.current, {
			x: position[0],
			y: position[1],
			z: position[2],
			duration: 3.2,
			ease: "power3.out",
			onUpdate: () => {
				setDronePosition([
					dronePositionRef.current.x,
					dronePositionRef.current.y,
					dronePositionRef.current.z
				]);
			}
		});
	}, []);

	const updateCanvasSize = useCallback((size: { width: string; height: string }) => {
		// Parse percentage values without the % symbol
		const targetWidth = parseFloat(size.width);
		const targetHeight = parseFloat(size.height);
		
		gsap.to(canvasSizeRef.current, {
			width: targetWidth,
			height: targetHeight,
			duration: 0.8,
			ease: "power2.inOut",
			onUpdate: () => {
				setCanvasSize({
					width: `${canvasSizeRef.current.width}%`,
					height: `${canvasSizeRef.current.height}%`
				});
			}
		});
	}, []);

	const updateCanvasPosition = useCallback((position: { top: string; right: string; transform?: string }) => {
		// Parse percentage values without the % symbol
		const targetTop = parseFloat(position.top);
		const targetRight = parseFloat(position.right);
		gsap.to(canvasPositionRef.current, {
			top: targetTop,
			right: targetRight,
          
      duration: 1.8,
			ease: "power2.inOut",
			onUpdate: () => {
				setCanvasPosition({
					top: `${canvasPositionRef.current.top}%`,
					right: `${canvasPositionRef.current.right}%`,
					// transform: position.transform
				});
			}
		});
	}, []);

	const updateAnimationSpeed = useCallback((speed: number) => {
		setAnimationSpeed(speed);
	}, []);

	const setDroneVisibility = useCallback((visible: boolean) => {
		setIsVisible(visible);
	}, []);

	return (
		<DroneContext.Provider
			value={{
				droneScale,
				dronePosition,
				canvasSize,
				canvasPosition,
				animationSpeed,
				isVisible,
				updateDroneScale,
				updateDronePosition,
				updateCanvasSize,
				updateCanvasPosition,
				updateAnimationSpeed,
				setDroneVisibility,
			}}
		>
			{children}
		</DroneContext.Provider>
	);
};

export const useDroneContext = () => {
	const context = useContext(DroneContext);
	if (!context) {
		throw new Error("useDroneContext must be used within a DroneProvider");
	}
	return context;
};