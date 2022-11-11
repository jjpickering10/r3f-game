import { useKeyboardControls } from '@react-three/drei';
import useGame from '../stores/useGame';
import React, { useEffect, useRef } from 'react';
import '../index.css';
import { addEffect } from '@react-three/fiber';

const Interface = () => {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const timeRef = useRef();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === 'playing') {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === 'ended') {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime;
      }
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none'>
      <div
        ref={timeRef}
        className='absolute top-[15%] left-0 w-full text-white text-[6vh] bg-black bg-opacity-30 pt-[5px] text-center'
      >
        0.00
      </div>
      {phase === 'ended' && (
        <div
          onClick={restart}
          className='absolute top-[40%] left-0 w-full text-white text-[80px] bg-black bg-opacity-30 pt-[10px] text-center cursor-pointer pointer-events-auto'
        >
          Restart
        </div>
      )}
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
