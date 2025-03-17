
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Platform(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/heart.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="IronMan_4Kfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="pCylinder1">
                  <mesh
                    name="pCylinder1_blinn1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.pCylinder1_blinn1_0.geometry}
                    material={materials.blinn1}
                  />
                </group>
                <group name="pCylinder2">
                  <group name="transform1" />
                </group>
                <group name="pTorus1" position={[-3.47, 0.775, -2.485]} scale={0.037}>
                  <group name="transform7" />
                </group>
                <group name="pTorus2" position={[-3.784, 0.773, -1.934]} scale={0.037}>
                  <group name="transform6" />
                </group>
                <group name="pTorus3" position={[3.476, 0.775, -2.486]} scale={0.037}>
                  <group name="transform2" />
                </group>
                <group name="pTorus4" position={[3.792, 0.774, -1.939]} scale={0.037}>
                  <group name="transform3" />
                </group>
                <group name="pTorus5" position={[0.319, 0.774, 4.183]} scale={0.037}>
                  <group name="transform4" />
                </group>
                <group name="pTorus6" position={[-0.317, 0.775, 4.182]} scale={0.037}>
                  <group name="transform5" />
                </group>
                <group name="pTorus7">
                  <group name="polySurface7">
                    <mesh
                      name="polySurface7_blinn2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.polySurface7_blinn2_0.geometry}
                      material={materials.blinn2}
                    />
                  </group>
                  <group name="transform8" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/heart.glb')
