import React from 'react';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorOneMaterial = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floorTwoMaterial = new THREE.MeshStandardMaterial({
  color: 'greenyellow',
});
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

const Start = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floorOneMaterial}
        scale={[4, 0.2, 4]}
      ></mesh>
    </group>
  );
};
const Spinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, time, 0)
    );
    obstacle.current.setNextKinematicRotation(rotation);
  });
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floorTwoMaterial}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type='kinematicPosition'
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const Level = () => {
  return (
    <>
      <Start position={[0, 0, 4]} />
      <Spinner />
    </>
  );
};

export default Level;
