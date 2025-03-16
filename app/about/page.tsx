"use client";

import React from "react";
import { motion } from "framer-motion";
import ContentCard from "@/components/3d/ContentCard";
import TrueFocus from "@/components/3d/TrueFocus";

const AboutPage = () => {
	const visionMission = [
		{
			title: "Our Vision",
			description:
				"To create a transformative platform that bridges the gap between cutting-edge technology and human creativity, fostering innovation and collaboration in the digital age.",
			icon: "/globe.svg",
		},
		{
			title: "Our Mission",
			description:
				"To deliver an immersive, educational, and inspiring tech festival that showcases the latest advancements in technology while nurturing a community of forward-thinking innovators.",
			icon: "/window.svg",
		},
	];

	const history = [
		{
			title: "Origins",
			description:
				"Founded in 2024, Dimensions emerged from a vision to create a unique space where technology meets creativity. What started as a small gathering of tech enthusiasts has evolved into a premier technology festival.",
			icon: "/file.svg",
		},
		{
			title: "Evolution",
			description:
				"Over the years, we have grown to incorporate cutting-edge technologies, innovative workshops, and world-class speakers, making Dimensions a must-attend event in the tech community.",
			icon: "/window.svg",
		},
	];

	const highlights = [
		{
			title: "Interactive Workshops",
			description:
				"Hands-on sessions with industry experts exploring emerging technologies and innovative solutions.",
			icon: "/file.svg",
		},
		{
			title: "Tech Exhibitions",
			description:
				"Showcase of cutting-edge products, prototypes, and technological innovations from leading companies and startups.",
			icon: "/window.svg",
		},
		{
			title: "Networking Events",
			description:
				"Connect with industry leaders, innovators, and fellow tech enthusiasts in a dynamic environment.",
			icon: "/globe.svg",
		},
	];

	const timeline = [
		{
			day: "Day 1",
			events: [
				{ time: "09:00 AM", title: "Opening Ceremony", track: "Main Event" },
				{
					time: "10:30 AM",
					title: "Keynote: Future of AI",
					track: "Technology",
				},
				{
					time: "02:00 PM",
					title: "Workshop: Web3 Development",
					track: "Development",
				},
			],
		},
		{
			day: "Day 2",
			events: [
				{
					time: "09:30 AM",
					title: "Panel: Tech Innovation",
					track: "Innovation",
				},
				{
					time: "11:00 AM",
					title: "Workshop: Cloud Computing",
					track: "Technology",
				},
				{ time: "03:00 PM", title: "Startup Showcase", track: "Business" },
			],
		},
		{
			day: "Day 3",
			events: [
				{ time: "10:00 AM", title: "Hackathon Kickoff", track: "Development" },
				{
					time: "02:00 PM",
					title: "VR/AR Demonstrations",
					track: "Technology",
				},
				{ time: "05:00 PM", title: "Closing Ceremony", track: "Main Event" },
			],
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1A1F3C] to-[#2A2F4C] text-white py-20 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-7xl mx-auto"
			>
				<div className="text-center mb-16">
					<TrueFocus
						sentence="About Dimensions 2024"
						manualMode={true}
						blurAmount={3}
						borderColor="#6366f1"
						glowColor="rgba(99, 102, 241, 0.6)"
					/>
					<p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-8">
						Dimensions is more than just a tech festival - it s a gateway to the
						future of technology and innovation.
					</p>
				</div>

				{/* Event Overview */}
				<div className="mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
						Event Overview
					</h2>
					<div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-xl">
						<p className="text-gray-300 text-lg leading-relaxed">
							Dimensions 2024 brings together the brightest minds in technology
							for three days of innovation, learning, and collaboration.
							Experience cutting-edge demonstrations, engage in hands-on
							workshops, and connect with industry leaders who are shaping the
							future of technology.
						</p>
					</div>
				</div>

				{/* Vision & Mission */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
					{visionMission.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
						>
							<ContentCard
								title={item.title}
								description={item.description}
								icon={item.icon}
								showTooltip={true}
							/>
						</motion.div>
					))}
				</div>

				{/* History/Concept */}
				<div className="mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
						Our Journey
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{history.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
							>
								<ContentCard
									title={item.title}
									description={item.description}
									icon={item.icon}
									showTooltip={true}
								/>
							</motion.div>
						))}
					</div>
				</div>

				{/* Key Highlights */}
				<div className="mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
						Key Highlights
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{highlights.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
							>
								<ContentCard
									title={item.title}
									description={item.description}
									icon={item.icon}
									showTooltip={true}
								/>
							</motion.div>
						))}
					</div>
				</div>

				{/* Event Timeline */}
				<div className="mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
						Event Timeline
					</h2>
					<div className="space-y-8">
						{timeline.map((day, dayIndex) => (
							<motion.div
								key={dayIndex}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: dayIndex * 0.2 }}
								className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
							>
								<h3 className="text-2xl font-bold mb-4 text-purple-400">
									{day.day}
								</h3>
								<div className="space-y-4">
									{day.events.map((event, eventIndex) => (
										<motion.div
											key={eventIndex}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: dayIndex * 0.2 + eventIndex * 0.1 }}
											className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
										>
											<div className="text-purple-400 font-semibold">
												{event.time}
											</div>
											<div>
												<h4 className="font-semibold text-white">
													{event.title}
												</h4>
												<span className="text-sm text-gray-400">
													{event.track}
												</span>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="text-center"
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
						Join the Revolution
					</h2>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
						Be part of a community thats shaping the future of technology.
						Experience innovation like never before.
					</p>
					<motion.button
						whileHover={{
							scale: 1.05,
							boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
						}}
						whileTap={{ scale: 0.95 }}
						className="px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#4169E1] rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#00FFFF]/30 transition-all duration-300 border border-[#00FFFF]/20"
					>
						Register Now
					</motion.button>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default AboutPage;
