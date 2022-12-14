import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import useGame from '../stores/useGame';

const Player = () => {
  const ballRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();
  const [smoothCameraPosition, setSmoothCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothCameraTarget, setSmoothCameraTarget] = useState(
    () => new THREE.Vector3()
  );
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);
  useFrame((state, delta) => {
    // Controls
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;
    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    ballRef.current.applyImpulse(impulse);
    ballRef.current.applyTorqueImpulse(torque);

    // Camera

    const ballPosition = ballRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(ballPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(ballPosition);
    cameraTarget.y += 0.25;

    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);

    // Phases

    if (ballPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }
    if (ballPosition.y < -4) {
      restart();
    }
  });

  const jump = () => {
    const origin = ballRef.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);
    if (hit.toi < 0.15) {
      ballRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  const reset = () => {
    ballRef.current.setTranslation({ x: 0, y: 1, z: 0 });
    ballRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    ballRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => {
        return state.phase;
      },
      (phase) => {
        if (phase === 'ready') {
          reset();
        }
      }
    );
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
    };
  }, []);
  return (
    <RigidBody
      ref={ballRef}
      colliders={'ball'}
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color={'mediumpurple'} />
      </mesh>
    </RigidBody>
  );
};

export default Player;
