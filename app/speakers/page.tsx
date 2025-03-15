'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Speakers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <SpeakerCard key={index} {...speaker} />
            ))}
          </div>
        </div>
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
}