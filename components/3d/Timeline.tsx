"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShare, FaTwitter, FaLinkedin, FaMedal } from "react-icons/fa";

interface Event {
	day: string;
	time: string;
	title: string;
	track: string;
	description?: string;
	speaker?: string;
	achievements?: string[];
}

interface TimelineProps {
	events?: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events = [] }) => {
	const [selectedDay, setSelectedDay] = useState<string>("all");
	const [selectedTrack, setSelectedTrack] = useState<string>("all");
	const [notifications, setNotifications] = useState<string[]>([]);
	const [showShareMenu, setShowShareMenu] = useState<number | null>(null);

	const days = ["Day 1", "Day 2", "Day 3"];
	const tracks = [
		"All",
		"Main Event",
		"Technology",
		"Development",
		"Innovation",
		"Business",
	];

	const handleShare = (platform: string, event: Event) => {
		const text = `Check out ${event.title} at our tech event!`;
		const url = window.location.href;

		switch (platform) {
			case "twitter":
				window.open(
					`https://twitter.com/intent/tweet?text=${encodeURIComponent(
						text
					)}&url=${encodeURIComponent(url)}`
				);
				break;
			case "linkedin":
				window.open(
					`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
						url
					)}`
				);
				break;
		}
	};

	const filteredEvents = events.filter((event) => {
		const dayMatch = selectedDay === "all" || event.day === selectedDay;
		const trackMatch = selectedTrack === "all" || event.track === selectedTrack;
		return dayMatch && trackMatch;
	});

	// Simulated real-time updates
	useEffect(() => {
		const interval = setInterval(() => {
			const demoNotifications = [
				"New speaker added to AI Panel!",
				"Cloud Computing workshop room changed",
				"Hackathon submission deadline extended",
			];
			const randomNotification =
				demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
			setNotifications((prev) => [randomNotification, ...prev.slice(0, 2)]);
		}, 30000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full py-16 bg-gradient-to-br from-[#0A0F1C] via-[#1A1F3C] to-[#2A2F4C] dark:from-[#000000] dark:via-[#111827] dark:to-[#1F2937]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#4169E1] transition-colors duration-300 dark:from-[#E0FFFF] dark:to-[#87CEEB]">
					Event Timeline
				</h2>

				{/* Notifications */}
				<AnimatePresence>
					{notifications.map((notification, index) => (
						<motion.div
							key={`${notification}-${index}`}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
							className="bg-[#00FFFF]/20 backdrop-blur-lg text-gray-900 dark:text-white p-4 sm:p-6 rounded-lg mb-4 shadow-lg border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all duration-300"
						>
							{notification}
						</motion.div>
					))}
				</AnimatePresence>

				{/* Filters */}
				<div className="flex flex-wrap gap-4 sm:gap-6 mb-8 sm:mb-12">
					<div className="flex-1 min-w-[200px] sm:min-w-[250px]">
						<label className="block text-base sm:text-lg font-medium mb-2 sm:mb-3 text-[#00FFFF] dark:text-[#E0FFFF]">
							Filter by Day
						</label>
						<select
							value={selectedDay}
							onChange={(e) => setSelectedDay(e.target.value)}
							className="w-full p-3 sm:p-4 rounded-lg bg-[#1A1F3C]/30 backdrop-blur-lg border border-[#00FFFF]/20 text-gray-900 dark:text-white focus:border-[#00FFFF]/40 focus:ring-2 focus:ring-[#00FFFF]/40 transition-all duration-300 text-base sm:text-lg"
						>
							<option value="all">All Days</option>
							{days.map((day) => (
								<option key={day} value={day}>
									{day}
								</option>
							))}
						</select>
					</div>
					<div className="flex-1 min-w-[200px] sm:min-w-[250px]">
						<label className="block text-base sm:text-lg font-medium mb-2 sm:mb-3 text-[#00FFFF] dark:text-[#E0FFFF]">
							Filter by Track
						</label>
						<select
							value={selectedTrack}
							onChange={(e) => setSelectedTrack(e.target.value)}
							className="w-full p-3 sm:p-4 rounded-lg bg-[#1A1F3C]/30 backdrop-blur-lg border border-[#00FFFF]/20 text-gray-900 dark:text-white focus:border-[#00FFFF]/40 focus:ring-2 focus:ring-[#00FFFF]/40 transition-all duration-300 text-base sm:text-lg"
						>
							{tracks.map((track) => (
								<option key={track} value={track.toLowerCase()}>
									{track}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Timeline */}
				<div className="space-y-6 sm:space-y-8">
					<AnimatePresence mode="wait">
						{filteredEvents.map((event, index) => (
							<motion.div
								key={`${event.day}-${event.title}`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{ delay: index * 0.1, duration: 0.3 }}
								className="flex items-center gap-4 sm:gap-6"
							>
								<div className="w-24 sm:w-32 text-lg sm:text-xl font-bold text-[#00FFFF] dark:text-[#E0FFFF] transition-colors duration-300">
									{event.time}
								</div>
								<div className="flex-1 bg-[#1A1F3C]/10 backdrop-blur-lg p-4 sm:p-6 rounded-lg border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 hover:bg-[#1A1F3C]/20 transition-all duration-300 group">
									<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
										<h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-[#00FFFF] dark:group-hover:text-[#E0FFFF]">
											{event.title}
										</h3>
										<span className="px-3 py-1 bg-[#00FFFF]/20 text-[#00FFFF] dark:text-[#E0FFFF] rounded-full text-sm sm:text-base border border-[#00FFFF]/20 transition-colors duration-300">
											{event.track}
										</span>
									</div>
									{event.description && (
										<p className="text-gray-700 dark:text-gray-300 mb-2 sm:mb-4 text-base sm:text-lg transition-colors duration-300">
											{event.description}
										</p>
									)}
									{event.speaker && (
										<p className="text-sm sm:text-base text-[#00FFFF] dark:text-[#E0FFFF] transition-colors duration-300">
											{event.speaker}
										</p>
									)}

									{/* Achievements Section */}
									{event.achievements && event.achievements.length > 0 && (
										<div className="mt-4 flex flex-wrap gap-2">
											{event.achievements.map((achievement, i) => (
												<div
													key={i}
													className="flex items-center gap-2 px-3 py-1 bg-[#00FFFF]/10 rounded-full border border-[#00FFFF]/20"
												>
													<FaMedal className="text-[#00FFFF] dark:text-[#E0FFFF] w-4 h-4" />
													<span className="text-sm text-[#00FFFF] dark:text-[#E0FFFF]">
														{achievement}
													</span>
												</div>
											))}
										</div>
									)}

									{/* Social Share Buttons */}
									<div className="mt-4 flex items-center gap-4">
										<button
											onClick={() =>
												setShowShareMenu(showShareMenu === index ? null : index)
											}
											className="flex items-center gap-2 text-[#00FFFF] dark:text-[#E0FFFF] hover:opacity-80 transition-opacity duration-300"
										>
											<FaShare className="w-4 h-4" />
											<span className="text-sm">Share</span>
										</button>

										{showShareMenu === index && (
											<div className="flex gap-2">
												<button
													onClick={() => handleShare("twitter", event)}
													className="p-2 text-[#00FFFF] dark:text-[#E0FFFF] hover:opacity-80 transition-opacity duration-300"
												>
													<FaTwitter className="w-4 h-4" />
												</button>
												<button
													onClick={() => handleShare("linkedin", event)}
													className="p-2 text-[#00FFFF] dark:text-[#E0FFFF] hover:opacity-80 transition-opacity duration-300"
												>
													<FaLinkedin className="w-4 h-4" />
												</button>
											</div>
										)}
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default Timeline;