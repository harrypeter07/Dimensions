"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

class Pixel {
	width: number;
	height: number;
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	color: string;
	speed: number;
	size: number;
	sizeStep: number;
	minSize: number;
	maxSizeInteger: number;
	maxSize: number;
	delay: number;
	counter: number;
	counterStep: number;
	isIdle: boolean;
	isReverse: boolean;
	isShimmer: boolean;

	constructor(
		canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		x: number,
		y: number,
		color: string,
		speed: number,
		delay: number
	) {
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = context;
		this.x = x;
		this.y = y;
		this.color = color;
		this.speed = this.getRandomValue(0.1, 0.9) * speed;
		this.size = 0;
		this.sizeStep = Math.random() * 0.4;
		this.minSize = 0.5;
		this.maxSizeInteger = 2;
		this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
		this.delay = delay;
		this.counter = 0;
		this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
		this.isIdle = false;
		this.isReverse = false;
		this.isShimmer = false;
	}

	getRandomValue(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	draw(): void {
		const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(
			this.x + centerOffset,
			this.y + centerOffset,
			this.size,
			this.size
		);
	}

	appear(): void {
		this.isIdle = false;
		if (this.counter <= this.delay) {
			this.counter += this.counterStep;
			return;
		}
		if (this.size >= this.maxSize) {
			this.isShimmer = true;
		}
		if (this.isShimmer) {
			this.shimmer();
		} else {
			this.size += this.sizeStep;
		}
		this.draw();
	}

	disappear(): void {
		this.isShimmer = false;
		this.counter = 0;
		if (this.size <= 0) {
			this.isIdle = true;
			return;
		} else {
			this.size -= 0.1;
		}
		this.draw();
	}

	shimmer(): void {
		if (this.size >= this.maxSize) {
			this.isReverse = true;
		} else if (this.size <= this.minSize) {
			this.isReverse = false;
		}
		if (this.isReverse) {
			this.size -= this.speed;
		} else {
			this.size += this.speed;
		}
	}
}

function getEffectiveSpeed(
	value: string | number,
	reducedMotion: boolean
): number {
	const min = 0;
	const max = 100;
	const throttle = 0.001;
	const parsed = typeof value === "string" ? parseInt(value, 10) : value;

	if (parsed <= min || reducedMotion) {
		return min;
	} else if (parsed >= max) {
		return max * throttle;
	} else {
		return parsed * throttle;
	}
}

interface VariantConfig {
	activeColor: string | null;
	gap: number;
	speed: number;
	colors: string;
	noFocus: boolean;
}

/**
 *  You can change/expand these as you like.
 */
const VARIANTS: Record<string, VariantConfig> = {
	default: {
		activeColor: null,
		gap: 5,
		speed: 35,
		colors: "#f8fafc,#f1f5f9,#cbd5e1",
		noFocus: false,
	},
	blue: {
		activeColor: "#e0f2fe",
		gap: 10,
		speed: 25,
		colors: "#e0f2fe,#7dd3fc,#0ea5e9",
		noFocus: false,
	},
	yellow: {
		activeColor: "#fef08a",
		gap: 3,
		speed: 20,
		colors: "#fef08a,#fde047,#eab308",
		noFocus: false,
	},
	pink: {
		activeColor: "#fecdd3",
		gap: 6,
		speed: 80,
		colors: "#fecdd3,#fda4af,#e11d48",
		noFocus: true,
	},
};

interface ContentCardProps {
	title?: string;
	description?: string;
	icon?: string;
	showTooltip?: boolean;
	subtitle?: string;
	additionalInfo?: React.ReactNode | string;
	variant?: string;
	gap?: number;
	speed?: number;
	colors?: string;
	noFocus?: boolean;
	className?: string;
	children?: ReactNode;
	isHovered?: boolean;
}

const ContentCard = ({
	title,
	description,
	icon,
	showTooltip = false,
	subtitle,
	additionalInfo,
	variant = "default",
	gap,
	speed,
	colors,
	noFocus,
	className = "",
	children,
	isHovered,
}: ContentCardProps) => {
	const [internalHovered, setInternalHovered] = useState(false);
	const isCardHovered = isHovered ?? internalHovered;
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const pixelsRef = useRef<Pixel[]>([]);
	const animationRef = useRef<number | null>(null);
	const timePreviousRef = useRef<number>(0);
	const reducedMotionRef = useRef<boolean>(false);

	useEffect(() => {
		timePreviousRef.current = performance.now();
		reducedMotionRef.current =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);

	const variantCfg = VARIANTS[variant] || VARIANTS.default;
	const finalGap = gap ?? variantCfg.gap;
	const finalSpeed = speed ?? variantCfg.speed;
	const finalColors = colors ?? variantCfg.colors;
	const finalNoFocus = noFocus ?? variantCfg.noFocus;

	const initPixels = (): void => {
		if (!containerRef.current || !canvasRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const width = Math.floor(rect.width);
		const height = Math.floor(rect.height);
		const ctx = canvasRef.current.getContext("2d");

		if (!ctx) return;

		canvasRef.current.width = width;
		canvasRef.current.height = height;
		canvasRef.current.style.width = `${width}px`;
		canvasRef.current.style.height = `${height}px`;

		const colorsArray = finalColors.split(",");
		const pxs: Pixel[] = [];
		for (let x = 0; x < width; x += parseInt(String(finalGap), 10)) {
			for (let y = 0; y < height; y += parseInt(String(finalGap), 10)) {
				const color =
					colorsArray[Math.floor(Math.random() * colorsArray.length)];

				const dx = x - width / 2;
				const dy = y - height / 2;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const delay = reducedMotionRef.current ? 0 : distance;

				pxs.push(
					new Pixel(
						canvasRef.current,
						ctx,
						x,
						y,
						color,
						getEffectiveSpeed(finalSpeed, reducedMotionRef.current),
						delay
					)
				);
			}
		}
		pixelsRef.current = pxs;
	};

	const doAnimate = (fnName: "appear" | "disappear"): void => {
		animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
		const timeNow = performance.now();
		const timePassed = timeNow - timePreviousRef.current;
		const timeInterval = 1000 / 60; // ~60 FPS

		if (timePassed < timeInterval) return;
		timePreviousRef.current = timeNow - (timePassed % timeInterval);

		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx || !canvasRef.current) return;

		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		let allIdle = true;
		for (let i = 0; i < pixelsRef.current.length; i++) {
			const pixel = pixelsRef.current[i];
			pixel[fnName]();
			if (!pixel.isIdle) {
				allIdle = false;
			}
		}
		if (allIdle) {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		}
	};

	const handleAnimation = (name: "appear" | "disappear"): void => {
		if (animationRef.current !== null) {
			cancelAnimationFrame(animationRef.current);
		}
		animationRef.current = requestAnimationFrame(() => doAnimate(name));
	};

	const onMouseEnter = (): void => {
		setInternalHovered(true);
		handleAnimation("appear");
	};

	const onMouseLeave = (): void => {
		setInternalHovered(false);
		handleAnimation("disappear");
	};

	useEffect(() => {
		if (isHovered) {
			handleAnimation("appear");
		} else {
			handleAnimation("disappear");
		}
	}, [isHovered]);

	const onFocus = (): void => {
		setInternalHovered(true);
		handleAnimation("appear");
	};

	const onBlur = (): void => {
		setInternalHovered(false);
		handleAnimation("disappear");
	};

	useEffect(() => {
		initPixels();
		const observer = new ResizeObserver(() => {
			initPixels();
		});
		if (containerRef.current) {
			observer.observe(containerRef.current);
		}
		return () => {
			observer.disconnect();
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [finalGap, finalSpeed, finalColors, finalNoFocus]);

	return (
		<div
			ref={containerRef}
			className={`overflow-hidden relative h-full bg-transparent transition-all duration-300 ${
				isCardHovered ? "bg-white/10" : "bg-white/5"
			} border-white/10 ${className}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onFocus={finalNoFocus ? undefined : onFocus}
			onBlur={finalNoFocus ? undefined : onBlur}
			tabIndex={finalNoFocus ? -1 : 0}
		>
			<canvas className="absolute inset-0 w-full h-full" ref={canvasRef} />

			<div className="flex relative z-10 flex-col p-6 h-full">
				{/* Icon */}
				{icon && (
					<div className="flex justify-center items-center p-2 mb-4 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-transform duration-300 transform hover:scale-110">
						<img src={icon} alt={title || "Feature icon"} className="w-6 h-6" />
					</div>
				)}

				{/* Title */}
				{title && (
					<h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
				)}

				{/* Subtitle (if provided) */}
				{subtitle && (
					<p className="mb-2 text-sm font-medium text-indigo-400">{subtitle}</p>
				)}

				{/* Description */}
				{description && (
					<p className="flex-grow mb-4 text-gray-300">{description}</p>
				)}

				{/* Additional Info (if provided) */}
				{additionalInfo && (
					<div className="mt-auto">
						{typeof additionalInfo === "string" ? (
							<span className="text-sm text-indigo-300">{additionalInfo}</span>
						) : (
							additionalInfo
						)}
					</div>
				)}

				{/* Children content if provided */}
				{children}

				{/* Tooltip (if enabled) */}
				{showTooltip && isHovered && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="absolute -top-2 -right-2 px-2 py-1 text-xs text-white bg-indigo-600 rounded-md"
					>
						View Details
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default ContentCard;
