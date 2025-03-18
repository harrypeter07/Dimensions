"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedHero from "./AnimatedHero";
import ContentCard from "./ContentCard";
import TrueFocus from "./TrueFocus";

interface Event {
	title: string;
	description: string;
	image: string;
	additionalInfo: string;
}

const Hero: React.FC = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const events: Event[] = [
		{
			title: "Robotics Workshop",
			description:
				"Join our hands-on robotics workshop where you'll learn to build and program your own robot. Perfect for beginners and intermediate enthusiasts alike.",
			image: "/images/e1.jpg",
			additionalInfo: "Register Now",
		},
		{
			title: "AI & Machine Learning Summit",
			description:
				"Explore the latest developments in AI and machine learning with industry experts. Featuring keynote speakers and interactive sessions.",
			image: "/images/e2.jpg",
			additionalInfo: "Register Now",
		},
		{
			title: "Cybersecurity Challenge",
			description:
				"Test your skills in our intensive cybersecurity challenge. Solve real-world security problems and compete for exciting prizes.",
			image: "/images/e3.jpg",
			additionalInfo: "Register Now",
		},
		{
			title: "IoT Innovation Showcase",
			description:
				"Discover groundbreaking IoT projects and connect with innovators. Learn about the future of connected devices and smart technology.",
			image: "/images/e4.jpg",
			additionalInfo: "Register Now",
		},
		{
			title: "Game Development Workshop",
			description:
				"Create your own game from scratch using modern game development tools. Learn about game design, mechanics, and implementation.",
			image: "/images/e5.jpg",
			additionalInfo: "Register Now",
		},
		{
			title: "Tech Startup Pitch",
			description:
				"Present your tech startup idea to a panel of industry experts and investors. Get valuable feedback and networking opportunities.",
			image: "/images/e6.jpg",
			additionalInfo: "Register Now",
		},
		{
			title: "Virtual Reality Experience",
			description:
				"Step into the world of virtual reality with our immersive VR showcase. Experience the latest in VR technology and applications.",
			image: "/images/e7.jpg",
			additionalInfo: "Register Now",
		},
	];

	return (
		<div className="relative">
			<AnimatedHero />
			<div className="px-6 py-20 mx-auto max-w-7xl">
				<div className="mb-12">
					<TrueFocus
						sentence="Exciting Events"
						manualMode={true}
						blurAmount={3}
						borderColor="#6366f1"
						glowColor="rgba(99, 102, 241, 0.6)"
					/>
				</div>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
					{events.map((event, index) => (
						<motion.div
							key={index}
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="relative backdrop-blur-sm bg-white/5"
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<motion.div
								className="overflow-hidden rounded-t-xl aspect-video"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								<motion.img
									src={event.image}
									alt={event.title}
									className="object-cover w-full h-full"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
								/>
							</motion.div>
							<div className="p-4">
								<ContentCard
									colors="#42ff6b,#1c84e6,#edf3f7"
									isHovered={hoveredIndex === index}
									{...event}
									additionalInfo={
										<button className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50">
											Register Now
										</button>
									}
								/>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
