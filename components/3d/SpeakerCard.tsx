'use client';

import React from 'react';

interface SpeakerCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const SpeakerCard = ({ name, role, bio, imageUrl }: SpeakerCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">{role}</p>
        <p className="text-gray-500 dark:text-gray-400">{bio}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;