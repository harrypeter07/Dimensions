// Drone.tsx
"use client";
import React from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useDroneContext } from './DroneContext';


export function Drone({ castShadow = true, ...props }) {
  const { droneScale, dronePosition, animationSpeed } = useDroneContext();
  const group = useRef();
  const { scene, animations } = useGLTF('models/drone.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Set up the drone's propeller animations
    const mainAction = actions['Armature|Empty.001Action'];
    const secondAction = actions['Armature|Empty.002Action'];
    const thirdAction = actions['Armature|Empty.004Action'];
    const fourthAction = actions['Armature|EmptyAction'];

    // Play all animations
    if (mainAction) {
      mainAction.play();
      mainAction.timeScale = animationSpeed;
    }
    
    // if (secondAction) {
    //   secondAction.play();
    //   secondAction.timeScale = animationSpeed;
    // }
    
    // if (thirdAction) {
    //   thirdAction.play();
    //   thirdAction.timeScale = animationSpeed;
    // }
    
    // if (fourthAction) {
    //   fourthAction.play();
    //   fourthAction.timeScale = animationSpeed;
    // }
    
    return () => {
      // Clean up animations
      if (mainAction) mainAction.stop();
      // if (secondAction) secondAction.stop();
      // if (thirdAction) thirdAction.stop();
      // if (fourthAction) fourthAction.stop();
    };
  }, [actions, animationSpeed]);

  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null} 
      scale={droneScale}
      position={dronePosition}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="d63cb11cbf2745b1a26996bd080789bffbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/drone.glb');