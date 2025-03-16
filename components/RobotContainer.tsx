import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model as Robot } from './Robot';

const RobotContainer: React.FC = () => {
  const robotRef = useRef<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Play the animation when the component mounts and robot is loaded
    if (robotRef.current) {
      const { actions } = robotRef.current;
      
      // The animation is named "Scene" based on the console log
      if (actions && actions.Scene) {
        // Play the Scene animation
        actions.Scene.reset().fadeIn(0.5).play();
        setIsAnimating(true);
      }
    }
  }, [robotRef.current]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#121212' }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#2020ff" intensity={0.5} />
        
        {/* Robot with ref to access animations */}
        <Robot 
          ref={robotRef}
          position={[0, -1, 0]} 
        />
        
        {/* OrbitControls with up/down movement */}
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 2 - 0.3}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
        />
      </Canvas>
      
      {/* Optional animation status indicator */}
      {isAnimating && (
        <div 
          style={{ 
            position: 'absolute', 
            bottom: 20, 
            left: 20, 
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 4
          }}
        >
          Playing: Scene Animation
        </div>
      )}
    </div>
  );
};

export default RobotContainer;