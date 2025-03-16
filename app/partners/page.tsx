"use client";

import React from "react";
import { motion } from "framer-motion";
import TrueFocus from "@/components/3d/TrueFocus";
import ContentCard from "@/components/3d/ContentCard";

const PartnersPage = () => {
  const partners = [
    {
      name: "TechCorp Global",
      type: "Platinum Partner",
      description: "Leading technology solutions provider supporting innovation in AI and cloud computing.",
      logo: "/globe.svg",
      contribution: "Technology Infrastructure Partner"
    },
    {
      name: "InnovateLabs",
      type: "Gold Partner",
      description: "Research and development firm specializing in emerging technologies and digital transformation.",
      logo: "/window.svg",
      contribution: "Innovation Workshop Sponsor"
    },
    {
      name: "Future Dynamics",
      type: "Silver Partner",
      description: "Digital solutions company pioneering advancements in virtual and augmented reality.",
      logo: "/file.svg",
      contribution: "VR/AR Experience Provider"
    }
  ];

  const sponsors = [
    {
      name: "CodeCraft Solutions",
      type: "Technology Sponsor",
      description: "Enterprise software development company providing development tools and resources.",
      logo: "/window.svg",
      contribution: "Developer Tools Sponsor"
    },
    {
      name: "CloudScale Systems",
      type: "Infrastructure Sponsor",
      description: "Cloud infrastructure provider enabling scalable and reliable event operations.",
      logo: "/globe.svg",
      contribution: "Cloud Services Provider"
    },
    {
      name: "Digital Ventures Inc",
      type: "Event Sponsor",
      description: "Venture capital firm supporting technological innovation and startup growth.",
      logo: "/file.svg",
      contribution: "Startup Competition Sponsor"
    }
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
            sentence="Partners & Sponsors"
            manualMode={true}
            blurAmount={3}
            borderColor="#6366f1"
            glowColor="rgba(99, 102, 241, 0.6)"
          />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-8">
            Collaborating with industry leaders to bring you cutting-edge technology and innovation.
          </p>
        </div>

        {/* Partners Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Our Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1A1F3C]/10 backdrop-blur-lg rounded-xl p-6 border border-[#00FFFF]/20 hover:border-[#00FFFF]/40 transition-all duration-300"
              >
                <ContentCard
                  title={partner.name}
                  description={partner.description}
                  icon={partner.logo}
                  showTooltip={true}
                  subtitle={partner.type}
                  additionalInfo={partner.contribution}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Our Sponsors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <ContentCard
                  title={sponsor.name}
                  description={sponsor.description}
                  icon={sponsor.logo}
                  showTooltip={true}
                  subtitle={sponsor.type}
                  additionalInfo={sponsor.contribution}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Become a Partner
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Join us in shaping the future of technology. Partner with Dimensions 2024 and be part of something extraordinary.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#4169E1] rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#00FFFF]/30 transition-all duration-300 border border-[#00FFFF]/20"
          >
            Partner With Us
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PartnersPage;