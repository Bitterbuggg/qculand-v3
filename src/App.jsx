import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CampusModel from './components/CampusModel';

export default function App() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas
                camera={{ position: [10, 10, 10], fov: 50 }}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.0,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
            >
                {/* Lighting - adjusted for better color reproduction */}
                <ambientLight intensity={0.8} />
                <directionalLight
                    position={[10, 20, 10]}
                    intensity={1.5}
                />
                <directionalLight
                    position={[-10, 10, -10]}
                    intensity={0.5}
                />

                {/* 3D Model */}
                <Suspense fallback={null}>
                    <CampusModel />
                </Suspense>

                {/* Camera Controls */}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={50}
                />
            </Canvas>

            {/* UI Overlay */}
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                color: 'white',
                fontFamily: 'system-ui, sans-serif',
                fontSize: '14px',
                background: 'rgba(0,0,0,0.5)',
                padding: '12px 16px',
                borderRadius: '8px'
            }}>
                <h2 style={{ margin: 0, marginBottom: 8 }}>QCU Land V3</h2>
                <p style={{ margin: 0, opacity: 0.8 }}>
                    🖱️ Drag to rotate • Scroll to zoom • Right-drag to pan
                </p>
            </div>
        </div>
    );
}
