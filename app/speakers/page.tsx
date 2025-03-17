'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import SpeakerCard from '@/components/3d/SpeakerCard';
import ChatBot from '@/components/ui/ChatBot';

export default function SpeakersPage() {
  const speakers = [
    {
      name: 'John Doe',
      role: 'AI Researcher',
      bio: 'Leading expert in artificial intelligence and machine learning.',
      imageUrl: 'https://source.unsplash.com/400x400/?portrait,man'
    },
    {
      name: 'Jane Smith',
      role: 'Tech Innovator',
      bio: 'Pioneer in blockchain technology and decentralized systems.',
      imageUrl: 'https://source.unsplash.com/400x400/?portrait,woman'
    },
    {
      name: 'Mike Johnson',
      role: 'VR Specialist',
      bio: 'Virtual reality expert with 10+ years of industry experience.',
      imageUrl: 'https://source.unsplash.com/400x400/?portrait,person'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="px-4 mx-auto max-w-7xl">
          <h1 className="mb-12 text-4xl font-bold text-center">Our Speakers</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker, index) => (
              <SpeakerCard key={index} {...speaker} />
            ))}
          </div>
        </div>
      </div>
      <ChatBot />
   
    </div>
  );
}