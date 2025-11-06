import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { PresentationControls, Environment } from '@react-three/drei';

interface BugattiCar3DProps {
  exteriorColor?: string;
  rotation?: number;
  autoRotate?: boolean;
  scale?: number;
}

export function BugattiCar3D({ 
  exteriorColor = "#0ea5e9", 
  rotation = 0,
  autoRotate = true,
  scale = 1
}: BugattiCar3DProps) {
  const groupRef = useRef<Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15;
    } else if (groupRef.current) {
      groupRef.current.rotation.y = rotation;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} />
      
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <group ref={groupRef} scale={scale}>
          <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
            <boxGeometry args={[4.2, 0.8, 2.1]} />
            <meshStandardMaterial 
              color={exteriorColor} 
              metalness={0.95}
              roughness={0.05}
              envMapIntensity={2}
            />
          </mesh>
          
          <mesh castShadow receiveShadow position={[0, 0.85, 0.2]}>
            <boxGeometry args={[2.8, 0.7, 1.4]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.4}
              roughness={0.6}
              transparent
              opacity={0.2}
            />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.1, 1.2]}>
            <boxGeometry args={[3.8, 0.3, 0.2]} />
            <meshStandardMaterial 
              color={exteriorColor} 
              metalness={0.95}
              roughness={0.05}
              envMapIntensity={2}
            />
          </mesh>

          <mesh castShadow position={[0, 0.1, -1.2]}>
            <boxGeometry args={[3.8, 0.3, 0.2]} />
            <meshStandardMaterial 
              color={exteriorColor} 
              metalness={0.95}
              roughness={0.05}
              envMapIntensity={2}
            />
          </mesh>

          <mesh castShadow position={[-1.2, -0.1, 1.2]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <mesh castShadow position={[1.2, -0.1, 1.2]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>

          {[
            [1.7, -0.35, 1],
            [-1.7, -0.35, 1],
            [1.7, -0.35, -1],
            [-1.7, -0.35, -1],
          ].map((pos, i) => (
            <group key={i} position={pos as [number, number, number]}>
              <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.15} />
              </mesh>
              <mesh castShadow rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.32, 32]} />
                <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.1} />
              </mesh>
            </group>
          ))}
        </group>
      </PresentationControls>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0a0a" opacity={0.8} transparent />
      </mesh>
    </>
  );
}
