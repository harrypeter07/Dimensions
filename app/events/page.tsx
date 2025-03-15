'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Timeline from '@/components/3d/Timeline';
import ChatBot from '@/components/ui/ChatBot';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold">Tech Conference 2024</h3>
                  <p className="text-gray-600 dark:text-gray-300">Join us for an exciting tech conference!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Date: March 15, 2024</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Past Events</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-gray-500 pl-4">
                  <h3 className="text-xl font-semibold">Workshop 2023</h3>
                  <p className="text-gray-600 dark:text-gray-300">A successful workshop on emerging technologies.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Date: December 10, 2023</p>
                </div>
              </div>
            </div>
          </div>
          <Timeline />
        </div>
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
}