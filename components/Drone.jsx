"use client"
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useEffect, useRef } from 'react'
import * as THREE from 'three';

export function Drone({ scale = 1, castShadow = true, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF('models/drone.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    // Set up the drone's propeller animations
    const mainAction = actions['Armature|Empty.001Action'];
    const secondAction = actions['Armature|Empty.002Action'];
    
    if (mainAction) mainAction.play();
    if (secondAction) {
      secondAction.play();
      secondAction.timeScale = 0.5; // slow down the propeller animation
    }
    
    return () => {
      // Clean up animations if needed
      if (mainAction) mainAction.stop();
      if (secondAction) secondAction.stop();
    };
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={scale}>
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
  )
}

useGLTF.preload('/models/drone.glb')