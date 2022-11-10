import { Canvas } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.querySelector('#root'));

root.render(
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
);
