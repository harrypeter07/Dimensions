// import React, { useRef, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import { Model as Robot } from "./Robot";
// import * as THREE from "three";

// interface RobotRef {
//   actions: Record<string, THREE.AnimationAction>;
// }

// const RobotContainer: React.FC = () => {
//   const robotRef = useRef<RobotRef>(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [error, setError] = useState<string | null>(null);
// //   const [robotScale, setRobotScale] = useState(1);

//   useEffect(() => {
//     try {
//       if (robotRef.current && robotRef.current.actions) {
//         const { actions } = robotRef.current;
        
//         // Check if Scene animation exists and play it
//         if (actions?.Scene) {
//           actions.Scene.reset();
//           actions.Scene.play();
//           setIsAnimating(true);
//         } else {
//           setError("Scene animation not found");
//         }
//       }
//     } catch (err) {
//       setError(
//         `Failed to play animation: ${
//           err instanceof Error ? err.message : "Unknown error"
//         }`
//       );
//       console.error("Animation error:", err);
//     }
//   }, []);

// //   const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setRobotScale(parseFloat(e.target.value));
// //   };
// const robotScale  = 3.5;
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "40vh",
//         position: "relative",
//       }}
//     >
//       {/* Scale Controls */}
      

//       <Canvas
//         shadows
//         camera={{ position: [0, 1, 9], fov: 50 }}
//         style={{ background: 'transparent', position: 'absolute' }}
//         gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
//         onCreated={({ gl, scene }) => {
//           gl.setClearColor(0x000000, 0);
//           scene.background = null;
//           gl.shadowMap.enabled = true;
//           gl.shadowMap.type = THREE.PCFSoftShadowMap;
//         }}
//       >
//         {/* Lighting setup */}
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} intensity={1} castShadow />
//         <pointLight
//           position={[-10, -10, -10]}
//           color="#2020ff"
//           intensity={0.5}
//         />

//         {/* Robot with ref to access animations and scale prop */}
//         <Robot ref={robotRef} scale={robotScale}  />
//         <Environment preset="city" background={false} />

//         {/* OrbitControls with up/down movement */}
//         <OrbitControls
//           enableZoom={false}
//           enableRotate={true}
//           minPolarAngle={Math.PI / 2 - 0.3}
//           maxPolarAngle={Math.PI / 2 + 0.3}
//           minAzimuthAngle={-Infinity}
//           maxAzimuthAngle={Infinity}
//         />
//       </Canvas>

//       {/* Status indicator */}
//       {error ? (
//         <div
//           style={{
//             position: "absolute",
//             bottom: 20,
//             left: 20,
//             backgroundColor: "rgba(255,0,0,0.7)",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: 4,
//           }}
//         >
//           Error: {error}
//         </div>
//       ) : (
//         isAnimating && (
//           <div
//             style={{
//               position: "absolute",
//               bottom: 20,
//               left: 20,
//               backgroundColor: "rgba(0,0,0,0.7)",
//               color: "white",
//               padding: "8px 16px",
//               borderRadius: 4,
//             }}
//           >
//             Playing: Scene Animation
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default RobotContainer;

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model as Robot } from "./Robot";
import * as THREE from "three";

interface RobotRef {
  actions: Record<string, THREE.AnimationAction>;
}

const RobotContainer: React.FC = () => {
  const robotRef = useRef<RobotRef>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (robotRef.current && robotRef.current.actions) {
        const { actions } = robotRef.current;
        
        // Check if Scene animation exists and play it
        if (actions?.Scene) {
          actions.Scene.reset();
          actions.Scene.play();
          setIsAnimating(true);
        } else {
          setError("Scene animation not found");
        }
      }
    } catch (err) {
      setError(
        `Failed to play animation: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      console.error("Animation error:", err);
    }
  }, []);

  const robotScale = 3;
  // Define the position offset to move the robot down and to the right
  const robotPosition = [-0.01, -4.5, 0]; // [x, y, z] - positive x moves right, negative y moves down

  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1, 9], fov: 50 }}
        style={{ background: 'transparent', position: 'absolute' }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight
          position={[-10, -10, -10]}
          color="#2020ff"
          intensity={0.5}
        />

        {/* Robot with ref to access animations, scale prop, and position prop */}
        <Robot 
          ref={robotRef} 
          scale={robotScale} 
          position={robotPosition} 
        />
        <Environment preset="city" background={false} />

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

      {/* Status indicator */}
      {error ? (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            backgroundColor: "rgba(255,0,0,0.7)",
            color: "white",
            padding: "8px 16px",
            borderRadius: 4,
          }}
        >
          Error: {error}
        </div>
      ) : (
        isAnimating && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "8px 16px",
              borderRadius: 4,
            }}
          >
            Playing: Scene Animation
          </div>
        )
      )}
    </div>
  );
};

export default RobotContainer;