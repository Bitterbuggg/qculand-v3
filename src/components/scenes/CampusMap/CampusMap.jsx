import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MOUSE } from "three";
import * as THREE from 'three';

import CampusModel from "../../CampusModel";
import Character from "../../Character";
import BuildingModal from "../../ui/BuildingModal";
import { buildingConfigs } from "../../../data/buildings";

export default function CampusMap({ onEnterBuilding }) {
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, z: 0 });
    const [showBuildingModal, setShowBuildingModal] = useState(null);
    const [hoveredBuilding, setHoveredBuilding] = useState(null);
    const controlsRef = useRef();

    const handleBuildingClick = (buildingId) => {
        setShowBuildingModal(buildingId);
    };

    const handleFloorClick = (point) => {
        setPlayerPosition(point);
    };

    const handleEnterBuilding = () => {
        if (onEnterBuilding && showBuildingModal) {
            onEnterBuilding(showBuildingModal);
        }
        setShowBuildingModal(null);
    };

    const handleCloseModal = () => {
        setShowBuildingModal(null);
    };

    const handleBuildingHover = (buildingId) => {
        setHoveredBuilding(buildingId);
    };

    const handleBuildingHoverOut = () => {
        setHoveredBuilding(null);
    };

    return (
        <>
            <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}>
                <Canvas
                    camera={{ position: [0, 5, 10], fov: 55 }}
                    dpr={[1, 1.5]}
                    gl={{
                        powerPreference: "high-performance",
                        antialias: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.0,
                        outputColorSpace: THREE.SRGBColorSpace,
                    }}
                >
                    <color attach="background" args={["#a8d0ff"]} />
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 20, 10]} intensity={1.5} />
                    <directionalLight position={[-10, 10, -10]} intensity={0.5} />

                    <OrbitControls
                        ref={controlsRef}
                        enablePan={false}
                        rotateSpeed={0.4}
                        mouseButtons={{
                            LEFT: null,
                            MIDDLE: MOUSE.DOLLY,
                            RIGHT: MOUSE.ROTATE
                        }}
                    />

                    <CampusModel
                        onBuildingClick={handleBuildingClick}
                        onFloorClick={handleFloorClick}
                        onBuildingHover={handleBuildingHover}
                        onBuildingHoverOut={handleBuildingHoverOut}
                    />

                    <Character targetPosition={playerPosition} controlsRef={controlsRef} />
                </Canvas>
            </div>

            {/* Movement Instructions */}
            <div style={{
                position: 'absolute',
                bottom: 96,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 30,
                pointerEvents: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 500,
                textAlign: 'center'
            }}>
                <div>Click on the floor to move around</div>
                <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
                    Click on a building to view details
                </div>
            </div>

            {/* Building Name Hover Overlay */}
            {hoveredBuilding && buildingConfigs[hoveredBuilding] && (
                <div style={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50)',
                    pointerEvents: 'none',
                    zIndex: 40
                }}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        padding: '16px 40px',
                        borderRadius: '45px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#0f172a',
                            margin: 0
                        }}>
                            <span style={{ fontSize: '24px' }}>{buildingConfigs[hoveredBuilding].icon}</span>
                            {buildingConfigs[hoveredBuilding].name}
                        </h3>
                    </div>
                </div>
            )}

            {/* Building Entry Modal */}
            {showBuildingModal && buildingConfigs[showBuildingModal] && (
                <BuildingModal
                    config={buildingConfigs[showBuildingModal]}
                    onClose={handleCloseModal}
                    onEnter={handleEnterBuilding}
                />
            )}
        </>
    );
}
