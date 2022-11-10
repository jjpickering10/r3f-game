import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';

const Player = () => {
  const ballRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();
  useFrame((state, delta) => {
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
    console.log(hit.toi);
  };
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    return () => {
      unsubscribeJump();
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
