'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  {
    icon: FaGithub,
    href: 'https://github.com',
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com',
  },
  {
    icon: FaLinkedin,
    href: 'https://linkedin.com',
  },
  {
    icon: FaInstagram,
    href: 'https://instagram.com',
  },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Dimensions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Exploring the future of technology and innovation.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Speakers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Email: info@dimensions.com<br />
              Phone: +1 234 567 890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <div className="flex justify-center space-x-6 mb-6">
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
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Dimensions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;