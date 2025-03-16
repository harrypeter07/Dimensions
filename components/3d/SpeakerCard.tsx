'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Session {
  title: string;
  time: string;
  day: string;
  track: string;
}

interface SpeakerCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  expertise?: string[];
  sessions?: Session[];
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

const SpeakerCard = ({
  name,
  role,
  bio,
  imageUrl,
  expertise = [],
  sessions = [],
  social = {}
}: SpeakerCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-[#1A1F3C]/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-[#00FFFF]/20 hover:border-[#00FFFF]/40"
    >
      <div className="relative overflow-hidden group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <motion.div
          className="aspect-w-16 aspect-h-9 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>

      <motion.div className="p-6">
        <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#4169E1]">
          {name}
        </h3>
        <p className="text-gray-300 font-medium mb-4">{role}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-400 mb-4">{bio}</p>

              {expertise.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#00FFFF] mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#00FFFF]/20 text-[#00FFFF] rounded-full text-sm border border-[#00FFFF]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {sessions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#00FFFF] mb-2">Sessions</h4>
                  <div className="space-y-2">
                    {sessions.map((session, index) => (
                      <div
                        key={index}
                        className="p-3 bg-[#1A1F3C]/30 backdrop-blur-lg rounded-lg hover:bg-[#1A1F3C]/50 transition-colors duration-300 border border-[#00FFFF]/20"
                      >
                        <h5 className="font-semibold text-white">{session.title}</h5>
                        <p className="text-sm text-gray-400">
                          {session.day} - {session.time} | {session.track}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {Object.keys(social).length > 0 && (
                <div className="flex gap-4">
                  {social.twitter && (
                    <a
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors duration-300"
                    >
                      Twitter
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                  )}
                  {social.website && (
                    <a
                      href={social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00FFFF] hover:text-[#00FFFF]/80 transition-colors duration-300"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SpeakerCard;