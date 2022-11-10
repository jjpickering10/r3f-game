import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
import Lights from './Lights';
import { Level, Spinner, Axe, Limbo } from './Level';
import Player from './Player';
import useGame from '../stores/useGame';

const Experience = () => {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} />
        <Player />
      </Physics>
    </>
  );
};

export default Experience;
