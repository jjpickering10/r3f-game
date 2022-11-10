import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

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
const End = ({ position = [0, 0, 0] }) => {
  const hamburger = useGLTF('./hamburger.glb');
  hamburger.scene.children.forEach((child) => (child.castShadow = true));
  return (
    <group position={position}>
      <mesh
        position={[0, 0, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floorOneMaterial}
        scale={[4, 0.2, 4]}
      ></mesh>
      <RigidBody
        type={'fixed'}
        colliders={'hull'}
        restitution={0.2}
        friction={0}
        position={[0, 0.25, 0]}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
};
const Spinner = ({ position = [0, 0, 0] }) => {
  const [speed, setSpeed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const obstacle = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, time * speed, 0)
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

const Limbo = ({ position = [0, 0, 0] }) => {
  const [offset, setOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacle = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const translate = Math.sin(time + offset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + translate,
      z: position[2],
    });
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

const Axe = ({ position = [0, 0, 0] }) => {
  const [offset, setOffset] = useState(() => Math.random() * Math.PI * 2);
  const obstacle = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const translate = Math.sin(time + offset);
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + translate,
      y: position[1] + 0.75,
      z: position[2],
    });
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
          scale={[1.5, 1.5, 0.3]}
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
      <Start position={[0, 0, 0]} />
      {/* <Spinner position={[0, 0, 12]} />
      <Limbo position={[0, 0, 8]} />
      <Axe position={[0, 0, 4]} />
      <End position={[0, 0, 0]} /> */}
    </>
  );
};

export default Level;
