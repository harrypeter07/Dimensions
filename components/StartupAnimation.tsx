import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RobotContainer from "./RobotContainer";
import SplitText from "./SplitText";
import CountUp from "./CountUp";

interface StartupAnimationProps {
	onAnimationComplete: () => void;
}

const StartupAnimation: React.FC<StartupAnimationProps> = ({
	onAnimationComplete,
}) => {
	const [showRobot, setShowRobot] = useState(false);
	const [showText, setShowText] = useState(false);
	const [currentText, setCurrentText] = useState("Hello People!");
	const [startFadeOut, setStartFadeOut] = useState(false);
	const [showCountUp, setShowCountUp] = useState(true);
	const [countUpComplete, setCountUpComplete] = useState(false);

	useEffect(() => {
		if (countUpComplete) {
			// Show first text immediately
			setShowText(true);

			// Show robot after 4 seconds of text
			const robotTimer = setTimeout(() => {
				setShowRobot(true);
			}, 4000);

			// Change text to "Let me introduce myself" after 4 seconds
			const textTimer1 = setTimeout(() => {
				setCurrentText("Let me introduce myself");
			}, 4000);

			// Change text to "I am Atom, a smart robot" after 7 seconds
			const textTimer2 = setTimeout(() => {
				setCurrentText("I am Atom, a smart robot");
			}, 7000);

			// Change text to "Let's explore the website" after 11 seconds
			const textTimer3 = setTimeout(() => {
				setCurrentText("Let's explore the website");
			}, 11000);

			// Start fade out after final text + 4 seconds
			const fadeTimer = setTimeout(() => {
				setStartFadeOut(true);
				// Call onAnimationComplete after fade out animation (1 second)
				setTimeout(onAnimationComplete, 1000);
			}, 15000);

			return () => {
				clearTimeout(robotTimer);
				clearTimeout(textTimer1);
				clearTimeout(textTimer2);
				clearTimeout(textTimer3);
				clearTimeout(fadeTimer);
			};
		}
	}, [countUpComplete, onAnimationComplete]);

	return (
		<AnimatePresence>
			{!startFadeOut && (
				<motion.div
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className="fixed inset-0 z-[9999] flex items-center justify-between px-20 bg-black"
					style={{ pointerEvents: "none" }}
				>
					{showCountUp && !countUpComplete && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<CountUp
									from={0}
									to={100}
									separator=","
									direction="up"
									duration={8}
									className="font-bold text-white text-7xl"
									onEnd={() => {
										setShowCountUp(false);
										setCountUpComplete(true);
									}}
								/>
								<p className="mt-4 text-xl text-white">Loading...</p>
							</div>
						</div>
					)}

					{countUpComplete && (
						<>
							{/* Robot Container */}
							<motion.div
								initial={{ x: -100, opacity: 0 }}
								animate={showRobot ? { x: 0, opacity: 1 } : {}}
								transition={{ type: "spring", duration: 2, bounce: 0.3 }}
								className="w-1/2 h-screen"
								style={{ pointerEvents: "none" }}
							>
								<RobotContainer />
							</motion.div>

							{/* Text Container */}
							<motion.div
								initial={{ x: 100, opacity: 0 }}
								animate={showText ? { x: 0, opacity: 1 } : {}}
								transition={{ type: "spring", duration: 2, bounce: 0.3 }}
								className="flex items-center justify-center w-1/2"
								style={{ pointerEvents: "none" }}
							>
								{showText && (
									<div className="max-w-xl px-4 text-center">
										<SplitText
											text={currentText}
											className="text-4xl font-bold text-white md:text-5xl"
											delay={25}
											animationFrom={{
												opacity: 0,
												transform: "translate3d(0,20px,0)",
											}}
											animationTo={{
												opacity: 1,
												transform: "translate3d(0,0,0)",
											}}
											easing="easeOutQuart"
											threshold={0.1}
											rootMargin="-20px"
										/>
									</div>
								)}
							</motion.div>
						</>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default StartupAnimation;
