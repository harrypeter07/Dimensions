"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ContentCardProps {
	title: string;
	description: string;
	icon?: string;
	scaleOnHover?: number;
	rotateAmplitude?: number;
	showTooltip?: boolean;
}

const ContentCard = ({ 
	title, 
	description, 
	icon,
	scaleOnHover = 1.05,
	rotateAmplitude = 14,
	showTooltip = false
}: ContentCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const [lastY, setLastY] = useState(0);

	// Use the spring configuration from the working example
	const springValues = {
		damping: 30,
		stiffness: 100,
		mass: 2,
	};

	const rotateX = useSpring(useMotionValue(0), springValues);
	const rotateY = useSpring(useMotionValue(0), springValues);
	const scale = useSpring(1, springValues);
	const opacity = useSpring(0);
	const rotateFigcaption = useSpring(0, {
		stiffness: 350,
		damping: 30,
		mass: 1,
	});

	useEffect(() => {
		if (cardRef.current) {
			gsap.from(cardRef.current, {
				opacity: 0,
				y: 50,
				duration: 1,
				scrollTrigger: {
					trigger: cardRef.current,
					start: "top bottom-=100",
					toggleActions: "play none none reverse",
				},
			});
		}
	}, []);

	function handleMouse(event: React.MouseEvent) {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const offsetX = event.clientX - rect.left - rect.width / 2;
		const offsetY = event.clientY - rect.top - rect.height / 2;

		// Apply the rotateAmplitude from props to control rotation intensity
		const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
		const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

		rotateX.set(rotationX);
		rotateY.set(rotationY);

		// Set x and y for tooltip positioning
		x.set(event.clientX - rect.left);
		y.set(event.clientY - rect.top);

		// Calculate velocity for the figcaption rotation
		const velocityY = offsetY - lastY;
		rotateFigcaption.set(-velocityY * 0.6);
		setLastY(offsetY);
	}

	function handleMouseEnter() {
		scale.set(scaleOnHover);
		opacity.set(1);
	}

	function handleMouseLeave() {
		scale.set(1);
		rotateX.set(0);
		rotateY.set(0);
		opacity.set(0);
		rotateFigcaption.set(0);
	}

	return (
		<motion.div
			ref={cardRef}
			className="relative p-6 rounded-xl overflow-hidden [perspective:1000px]"
			onMouseMove={handleMouse}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX,
				rotateY,
				scale,
				transformStyle: "preserve-3d",
			}}
		>
			<div className="absolute inset-0 bg-gradient-to-br backdrop-blur-sm from-purple-600/10 to-blue-600/10" />
			<motion.div
				className="relative z-10"
				style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
			>
				{icon && (
					<motion.div
						className="mb-4 w-12 h-12 text-purple-600"
						whileHover={{ scale: 1.1 }}
						style={{ transform: "translateZ(30px)" }}
					>
						<img
							src={icon}
							alt={title}
							className="object-contain w-full h-full"
						/>
					</motion.div>
				)}
				<motion.h3
					className="mb-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
					whileHover={{ scale: 1.05 }}
					style={{ transform: "translateZ(25px)" }}
				>
					{title}
				</motion.h3>
				<p 
					className="leading-relaxed text-gray-600 dark:text-gray-300"
					style={{ transform: "translateZ(15px)" }}
				>
					{description}
				</p>
			</motion.div>

			{showTooltip && (
				<motion.div
					className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[5px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
					style={{
						x,
						y,
						opacity,
						rotate: rotateFigcaption,
						transform: "translateZ(40px)"
					}}
				>
					{title}
				</motion.div>
			)}
		</motion.div>
	);
};

export default ContentCard;