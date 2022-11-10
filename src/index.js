import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import App from './App';
import Interface from './components/Interface';

const root = createRoot(document.querySelector('#root'));

root.render(
  <KeyboardControls
    map={[
      { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
      { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
      { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
      { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
      { name: 'jump', keys: ['Space'] },
    ]}
  >
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <App />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
