'use client';

import React, { useEffect } from 'react'; // Add useEffect import
import Lenis from '@studio-freight/lenis'; // Add this import
import Hero from '@/components/3d/Hero';
import ChatBot from '@/components/ui/ChatBot';
import Timeline from '@/components/3d/Timeline';
import ZoomParallax from '@/components/ZoomParallax'; // Import the ZoomParallax component
import ScrollAnimation from '@/components/ScrollAnimation';
import RobotContainer from '@/components/RobotContainer';
// import DroneControls from '@/components/DroneControls';

export default function HomePage() {
  // Add the Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Clean up when component unmounts
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      
      <Hero />
      <ScrollAnimation/>
      <Timeline />
      <RobotContainer/>
     
      
      
      {/* Add the ZoomParallax component where you want it */}
      <ZoomParallax />
      
      <ChatBot />
     
    </div>
  );
}