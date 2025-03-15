"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
	sentence?: string;
	manualMode?: boolean;
	blurAmount?: number;
	borderColor?: string;
	glowColor?: string;
	animationDuration?: number;
	pauseBetweenAnimations?: number;
}

const TrueFocus = ({
	sentence = "Dimensions  ARE  4",
	manualMode = false,
	blurAmount = 5,
	borderColor = "#6366f1",
	glowColor = "rgba(99, 102, 241, 0.6)",
	animationDuration = 0.5,
	pauseBetweenAnimations = 1,
}: TrueFocusProps) => {
	const words = sentence.split(" ");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const [focusRect, setFocusRect] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const animationRef = useRef<NodeJS.Timeout | null>(null);

	const updateFocusRect = useCallback(() => {
		if (currentIndex < 0 || currentIndex >= words.length) return;
		if (!wordRefs.current[currentIndex] || !containerRef.current) return;

		const parentRect = containerRef.current.getBoundingClientRect();
		const activeRect = wordRefs.current[currentIndex]?.getBoundingClientRect();

		if (activeRect) {
			setFocusRect({
				x: activeRect.left - parentRect.left,
				y: activeRect.top - parentRect.top,
				width: activeRect.width,
				height: activeRect.height,
			});
		}
	}, [currentIndex, words.length]);

	// Initialize focus rect and set up animation
	useEffect(() => {
		// Initialize wordRefs array
		wordRefs.current = wordRefs.current.slice(0, words.length);
		
		// Clear any existing animation
		if (animationRef.current) {
			clearInterval(animationRef.current);
			animationRef.current = null;
		}

		// Set up animation if not in manual mode
		if (!manualMode) {
			// Update focus rect immediately
			setTimeout(updateFocusRect, 50);
			
			animationRef.current = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % words.length);
			}, (animationDuration + pauseBetweenAnimations) * 1000);
		} else {
			// In manual mode, just update focus rect for the current word
			setTimeout(updateFocusRect, 50);
		}

		return () => {
			if (animationRef.current) {
				clearInterval(animationRef.current);
			}
		};
	}, [
		manualMode,
		animationDuration,
		pauseBetweenAnimations,
		words.length,
		updateFocusRect,
	]);

	// Update focus rect when the current index changes
	useEffect(() => {
		setTimeout(updateFocusRect, 10);
	}, [currentIndex, updateFocusRect]);
	
	// Handle resize events
	useEffect(() => {
		window.addEventListener("resize", updateFocusRect);
		return () => window.removeEventListener("resize", updateFocusRect);
	}, [updateFocusRect]);

	const handleMouseEnter = useCallback(
		(index: number) => {
			if (manualMode) {
				setLastActiveIndex(currentIndex);
				setCurrentIndex(index);
			}
		},
		[manualMode, currentIndex]
	);

	const handleMouseLeave = useCallback(() => {
		if (manualMode && lastActiveIndex !== null) {
			setCurrentIndex(lastActiveIndex);
		}
	}, [manualMode, lastActiveIndex]);

	return (
		<div
			className="relative flex gap-4 justify-center items-center flex-wrap"
			ref={containerRef}
		>
			{words.map((word, index) => {
				const isActive = index === currentIndex;
				return (
					<span
						key={index}
						ref={(el) => {
							wordRefs.current[index] = el;
						}}
						className="relative text-[5rem]  font-black cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600"
						style={{
							filter: `blur(${isActive ? 0 : blurAmount}px)`,
							transition: `filter ${animationDuration}s ease`,
						}}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
					>
						{word}
					</span>
				);
			})}

			<motion.div
				className="absolute top-0 left-0 pointer-events-none box-border border-0"
				animate={{
					x: focusRect.x,
					y: focusRect.y,
					width: focusRect.width,
					height: focusRect.height,
					opacity: currentIndex >= 0 ? 1 : 0,
				}}
				transition={{
					duration: animationDuration,
					ease: "easeInOut",
				}}
			>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
					style={{
						borderColor: borderColor,
						filter: `drop-shadow(0 0 4px ${glowColor})`,
					}}
				/>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
					style={{
						borderColor: borderColor,
						filter: `drop-shadow(0 0 4px ${glowColor})`,
					}}
				/>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
					style={{
						borderColor: borderColor,
						filter: `drop-shadow(0 0 4px ${glowColor})`,
					}}
				/>
				<span
					className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
					style={{
						borderColor: borderColor,
						filter: `drop-shadow(0 0 4px ${glowColor})`,
					}}
				/>
			</motion.div>
		</div>
	);
};

export default TrueFocus;