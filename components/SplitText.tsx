import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface SplitTextProps {
	text?: string;
	className?: string;
	delay?: number;
	animationFrom?: { [key: string]: string | number };
	animationTo?: { [key: string]: string | number };
	easing?: string;
	threshold?: number;
	rootMargin?: string;
	textAlign?: "left" | "center" | "right";
	onLetterAnimationComplete?: () => void;
}

const SplitText = ({
	text = "",
	className = "",
	delay = 100,
	animationFrom = { opacity: 0, y: 40 },
	animationTo = { opacity: 1, y: 0 },
	easing = "easeOut",
	threshold = 0.1,
	rootMargin = "-100px",
	textAlign = "center",
	onLetterAnimationComplete,
}: SplitTextProps) => {
	const words = text.split(" ").map((word) => word.split(""));
	const letters = words.flat();
	const ref = useRef<HTMLParagraphElement>(null);
	const isInView = useInView(ref, {
		once: true,
		amount: threshold,
		margin: rootMargin,
	});

	useEffect(() => {
		if (isInView && onLetterAnimationComplete) {
			const timeout = setTimeout(() => {
				onLetterAnimationComplete();
			}, delay * letters.length);
			return () => clearTimeout(timeout);
		}
	}, [isInView, letters.length, delay, onLetterAnimationComplete]);

	return (
		<p
			ref={ref}
			className={`split-parent overflow-hidden inline ${className}`}
			style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
		>
			{words.map((word, wordIndex) => (
				<span
					key={wordIndex}
					style={{ display: "inline-block", whiteSpace: "nowrap" }}
				>
					{word.map((letter, letterIndex) => {
						const index =
							words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
							letterIndex;

						return (
							<motion.span
								key={index}
								initial={animationFrom}
								animate={isInView ? animationTo : animationFrom}
								transition={{
									duration: 0.6,
									delay: index * (delay / 1000),
									ease: easing,
								}}
								className="inline-block transform transition-opacity will-change-transform"
							>
								{letter}
							</motion.span>
						);
					})}
					<span style={{ display: "inline-block", width: "0.3em" }}>
						&nbsp;
					</span>
				</span>
			))}
		</p>
	);
};

export default SplitText;
