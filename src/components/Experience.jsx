import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
import Lights from './Lights';
import Level from './Level';

const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Lights />
        <Level />
      </Physics>
    </>
  );
};

export default Experience;
