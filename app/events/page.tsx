"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Timeline from "@/components/3d/Timeline";
import ChatBot from "@/components/ui/ChatBot";
import { motion } from "framer-motion";
import TrueFocus from "@/components/3d/TrueFocus";

export default function EventsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1A1F3C] to-[#2A2F4C] text-white">
			<Navbar />
			<div className="pt-24 pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<TrueFocus
							sentence="Upcoming Events"
							manualMode={true}
							blurAmount={3}
							borderColor="#6366f1"
							glowColor="rgba(99, 102, 241, 0.6)"
						/>
						<p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-8">
							Join us for exciting tech events and workshops throughout the
							year.
						</p>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all duration-300"
						>
							<h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#4169E1]">
								Upcoming Events
							</h2>
							<div className="space-y-6">
								<div className="border-l-4 border-[#00FFFF] pl-4">
									<h3 className="text-xl font-semibold text-white">
										Tech Conference 2024
									</h3>
									<p className="text-gray-300 mt-2">
										Join us for an exciting tech conference!
									</p>
									<p className="text-sm text-[#00FFFF] mt-2">
										Date: March 15, 2024
									</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all duration-300"
						>
							<h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#4169E1]">
								Past Events
							</h2>
							<div className="space-y-6">
								<div className="border-l-4 border-[#00FFFF]/50 pl-4">
									<h3 className="text-xl font-semibold text-white">
										Workshop 2023
									</h3>
									<p className="text-gray-300 mt-2">
										A successful workshop on emerging technologies.
									</p>
									<p className="text-sm text-[#00FFFF] mt-2">
										Date: December 10, 2023
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>

					<Timeline />
				</div>
			</div>
			<ChatBot />
			<Footer />
		</div>
	);
}
