import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/rapier';
import Lights from './Lights';
import { Level, Spinner, Axe, Limbo } from './Level';
import Player from './Player';
import useGame from '../stores/useGame';
import Effects from './Effects';

const Experience = () => {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });
  const blocksSeed = useGame((state) => {
    return state.blocksSeed;
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <color args={['#252731']} attach={'background'} />
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
};

export default Experience;
