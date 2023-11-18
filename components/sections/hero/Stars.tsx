import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AdditiveBlending } from 'three';

extend({ OrbitControls });

const Particle = ({ position }: { position: any }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshStandardMaterial color="#ffffff" blending={AdditiveBlending} />
    </mesh>
  );
};

export default function Stars() {
  const numParticles = 60;
  const [particles, setParticles] = useState(
    Array.from({ length: numParticles }).map(() => ({
      position: [
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
      ],
      initialPosition: [
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500
      ]
    }))
  );

  useEffect(() => {
    const handleScroll = (event: any) => {
      event.stopPropagation();
    };

    const canvas = document.querySelector('.canvas-container');

    if (canvas) {
      canvas.addEventListener('scroll', handleScroll, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="canvas-container"
      style={{ width: '100vw', height: '100vh', overflow: 'auto' }}
    >
      <Canvas dpr={[1, 2]} camera={{ fov: 75, position: [0, 0, 500] }}>
        <ambientLight intensity={0.3} />
        <group>
          {particles.map((particle, index) => (
            <Particle key={index} position={particle.position} />
          ))}
        </group>
        <OrbitControls
          enableZoom={false} // Disable zooming along the Z-axis
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
    </div>
  );
}
