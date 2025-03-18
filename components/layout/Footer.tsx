"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const socialLinks = [
	{
		icon: FaGithub,
		href: "https://github.com",
	},
	{
		icon: FaTwitter,
		href: "https://twitter.com",
	},
	{
		icon: FaLinkedin,
		href: "https://linkedin.com",
	},
	{
		icon: FaInstagram,
		href: "https://instagram.com",
	},
];

const Footer = () => {
	return (
		<footer className="relative z-[60] mt-16 bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-800/80">
			<div className="px-4 py-12 mx-auto max-w-7xl z-[100]">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div>
						<h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-white z-[100]">
							AXIS 25
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Exploring the future of technology and innovation.
						</p>
					</div>
					<div>
						<h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
							Quick Links
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/events"
									className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
								>
									Events
								</Link>
							</li>
							<li>
								<Link
									href="/speakers"
									className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
								>
									Speakers
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
							Contact
						</h4>
						<p className="text-gray-600 dark:text-gray-300">
							Email: info@AXIS 25.com
							<br />
							Phone: +1 234 567 890
						</p>
					</div>
				</div>
				<div className="pt-8 mt-8 text-center border-t border-gray-200 dark:border-gray-700">
					<div className="flex justify-center mb-6 space-x-6">
						{socialLinks.map((social, index) => {
							const Icon = social.icon;
							return (
								<motion.a
									key={index}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ y: -5, scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="text-gray-600 transition-colors duration-300 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
								>
									<Icon className="w-6 h-6" />
								</motion.a>
							);
						})}
					</div>
					<p className="text-gray-500 dark:text-gray-400">
						© {new Date().getFullYear()} AXIS 25. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
