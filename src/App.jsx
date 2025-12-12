import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import CampusModel from './components/CampusModel';

export default function App() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas
                camera={{ position: [10, 10, 10], fov: 50 }}
                shadows
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 20, 10]}
                    intensity={1}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                {/* Environment for better reflections */}
                <Environment preset="city" />

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

                {/* Ground plane for reference */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#2d3436" />
                </mesh>
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
