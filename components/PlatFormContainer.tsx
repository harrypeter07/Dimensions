import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Platform } from './Platform'; // Importing your Platform component

interface ExtendedOrbitControls {
  minPolarAngle: number;
  maxPolarAngle: number;
  enablePan: boolean;
  enableZoom: boolean;
  enableRotate: boolean;
  object?: THREE.Camera;
}

// Custom OrbitControls setup component
const TiltedControls: React.FC = () => {
  // Use the correct ref type
  const controlsRef = useRef(null);
  const { camera } = useThree();
  
  useEffect(() => {
    if (controlsRef.current) {
      // Set initial tilt
      camera.position.set(0, 2, 16);
      camera.lookAt(0, 0, 0);
      
      // Access the orbit controls instance
      const controls = controlsRef.current as ExtendedOrbitControls;
      
      // Lock vertical rotation
      controls.minPolarAngle = Math.PI / 2.5; // 45 degrees
      controls.maxPolarAngle = Math.PI / 2.5; // 45 degrees (fixed)
      
      // Configure controls
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableRotate = true;
    }
  }, [camera]);

  return <OrbitControls ref={controlsRef} enableZoom={false} enablePan={false} autoRotate={true}/>;
};

interface PlatformContainerProps {
  modelPath?: string;
  backgroundColor?: string;
  ambientLightIntensity?: number;
  cameraPosition?: [number, number, number];
  children?: React.ReactNode;
}

const PlatformContainer: React.FC<PlatformContainerProps> = ({
//   backgroundColor = 'transparent',
  ambientLightIntensity = 0.1,
  cameraPosition = [10, 10, -10],
  children
}) => {
  return (
    <div className="absolute w-full pointer-events-auto h-[38vh] transform-gpu">
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ background: 'transparent', position: 'absolute' , scale: '1' }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Platform/>
          <Environment preset="studio" background={false}  />
        </Suspense>
        <TiltedControls />
        {children}
      </Canvas>
    </div>
  );
};

export default PlatformContainer;