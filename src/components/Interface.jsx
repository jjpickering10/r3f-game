import { useKeyboardControls } from '@react-three/drei';
import React from 'react';
import '../index.css';

const Interface = () => {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  return (
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none'>
      <div className='absolute top-[15%] left-0 w-full text-white text-[6vh] bg-black bg-opacity-30 pt-[5px] text-center'>
        0.00
      </div>
      <div className='absolute top-[40%] left-0 w-full text-white text-[80px] bg-black bg-opacity-30 pt-[10px] text-center cursor-pointer pointer-events-auto'>
        Restart
      </div>
      <div className='controls'>
        <div className='raw'>
          <div className={`${forward ? 'active' : ''} key`}></div>
        </div>
        <div className='raw'>
          <div className={`${leftward ? 'active' : ''} key`}></div>
          <div className={`${backward ? 'active' : ''} key`}></div>
          <div className={`${rightward ? 'active' : ''} key`}></div>
        </div>
        <div className='raw'>
          <div className={`${jump ? 'active' : ''} key large`}></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
