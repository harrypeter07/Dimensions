'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Define the props interface here as well
interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

// Dynamically import the Particles component with no SSR
const Particles = dynamic(() => import('./Particles'), { ssr: false });

// Create a client wrapper that forwards all props
const ParticlesClient: React.FC<ParticlesProps> = (props) => {
  return <Particles {...props} />;
};

export default ParticlesClient;