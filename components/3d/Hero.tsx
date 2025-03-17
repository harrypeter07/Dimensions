'use client';

import React from 'react';
import AnimatedHero from './AnimatedHero';
import ContentCard from './ContentCard';

const Hero = () => {
  const features = [
    {
      title: "3D Visualization",
      description: "Experience immersive 3D models and animations that bring your ideas to life. Our cutting-edge visualization technology enables you to explore concepts in a whole new dimension, making complex ideas simple and engaging.",
      icon: "/globe.svg"
    },
    {
      title: "Interactive Design",
      description: "Engage with dynamic interfaces and responsive elements for a seamless experience. Our intuitive design system adapts to your needs, providing real-time feedback and smooth interactions that make navigation effortless.",
      icon: "/window.svg"
    },
    {
      title: "Modern Technology",
      description: "Built with cutting-edge tools and frameworks for optimal performance. We leverage the latest advancements in web technology to deliver fast, reliable, and scalable solutions that keep you ahead of the curve.",
      icon: "/file.svg"
    },
    {
      title: "Responsive Integration",
      description: "Seamlessly adapt to any device or screen size with our responsive design approach. Experience consistent quality and functionality across all platforms, ensuring your content looks and performs perfectly everywhere.",
      icon: "/window.svg"
    },
    {
      title: "Real-time Updates",
      description: "Stay connected with instant updates and live data synchronization. Our real-time processing capabilities ensure you're always working with the most current information, enabling faster decision-making and better results.",
      icon: "/globe.svg"
    },
    {
      title: "Advanced Analytics",
      description: "Gain deeper insights with our powerful analytics tools. Track performance, analyze trends, and make data-driven decisions with our comprehensive suite of analytical features and visualizations.",
      icon: "/file.svg"
    }
  ];

  return (
    <div className="relative">
      <AnimatedHero />
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <ContentCard   colors='#42ff6b ,#1c84e6,#edf3f7' key={index} {...feature} />
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Hero;