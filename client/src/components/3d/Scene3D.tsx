import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

interface Scene3DProps {
  children: ReactNode;
  className?: string;
}

export function Scene3D({ children, className = "" }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
