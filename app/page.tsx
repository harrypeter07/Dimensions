'use client';

import React from 'react';
import Hero from '@/components/3d/Hero';
import Timeline from '@/components/3d/Timeline';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/ui/ChatBot';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <Timeline />
      <ChatBot />
      <Footer />
    </div>
  );
}
