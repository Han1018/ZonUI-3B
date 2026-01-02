
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Float, Stars, Environment, Box, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Correctly extending the JSX namespace using ThreeElements from @react-three/fiber.
// This resolves "Property does not exist on type 'JSX.IntrinsicElements'" errors by providing full types for R3F elements.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const NeuronCloud = () => {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Points positions={points} ref={ref}>
      <PointMaterial transparent color="#C5A059" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
};

const InterfaceLayer = ({ position, color, delay }: { position: [number, number, number], color: string, delay: number }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.position.y = position[1] + Math.sin(t + delay) * 0.1;
        }
    });

    return (
        // Fix: mesh, boxGeometry, and meshStandardMaterial are now correctly typed via global augmentation.
        <mesh ref={ref} position={position} rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
            <boxGeometry args={[3, 2, 0.05]} />
            <meshStandardMaterial color={color} transparent opacity={0.4} metalness={0.8} roughness={0.2} />
        </mesh>
    );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Fix: ambientLight and pointLight are recognized as valid intrinsic elements. */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <NeuronCloud />
            <InterfaceLayer position={[0, 1, -1]} color="#C5A059" delay={0} />
            <InterfaceLayer position={[0.5, 0, 0]} color="#4F46E5" delay={1} />
            <InterfaceLayer position={[-0.5, -1, 1]} color="#9333EA" delay={2} />
        </Float>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const NeuralNetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Fix: Light elements are correctly identified within the Canvas. */}
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#C5A059" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={1} floatIntensity={0.5} speed={2}>
            {/* Fix: group, torusGeometry, and mesh tags are properly resolved. */}
            <group>
                {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[0, 0, (i - 2) * 0.5]}>
                        <torusGeometry args={[1.5 - i * 0.2, 0.02, 16, 100]} />
                        <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.5} />
                    </mesh>
                ))}
                {/* Core Processor Symbol using Drei Box and intrinsic material */}
                <Box args={[0.5, 0.5, 0.5]}>
                    <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.1} />
                </Box>
            </group>
        </Float>
      </Canvas>
    </div>
  );
}
