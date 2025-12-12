import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

// Building name patterns to detect in mesh names
const BUILDING_PATTERNS = {
    'techvoc': ['techvoc', 'bldg6'],
    'yellow-building': ['yellow', 'bldg5'],
    'admin-building': ['admin', 'bldg4'],
    'bautista': ['bautista', 'bldg2'],
    'computer-lab': ['computer', 'bldg1', 'complab'],
    'cube010-building': ['cube010', 'bldg3', 'academic'],
    'triangle-complex': ['triangle']
};

function detectBuilding(objectName) {
    const name = objectName.toLowerCase();
    for (const [buildingId, patterns] of Object.entries(BUILDING_PATTERNS)) {
        if (patterns.some(pattern => name.includes(pattern))) {
            return buildingId;
        }
    }
    return null;
}

export default function CampusModel({ onFloorClick, onBuildingClick, onBuildingHover, onBuildingHoverOut }) {
    const { scene } = useGLTF(`${ASSET_BASE}models/qcumapv2.glb`);

    // Fix textures and materials
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                if (child.material) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material];

                    materials.forEach((material) => {
                        if (material.map) {
                            material.map.colorSpace = THREE.SRGBColorSpace;
                            material.map.needsUpdate = true;
                        }

                        if (material.emissiveMap) {
                            material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
                            material.emissiveMap.needsUpdate = true;
                        }

                        if (material.opacity === 1 && !material.alphaMap) {
                            material.transparent = false;
                        }

                        material.depthWrite = true;
                        material.depthTest = true;
                        material.side = THREE.DoubleSide;

                        if (material.map && material.map.format === THREE.RGBAFormat) {
                            material.alphaTest = 0.1;
                        }

                        if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
                            if (material.metalness === undefined) material.metalness = 0;
                            if (material.roughness === undefined) material.roughness = 0.8;
                        }

                        // Store original emissive for hover effects
                        if (material.emissive) {
                            child.userData.originalEmissive = material.emissive.clone();
                        }

                        material.needsUpdate = true;
                    });
                }
            }
        });
    }, [scene]);

    const handleClick = (e) => {
        e.stopPropagation();
        const clickedName = e.object.name;
        const buildingId = detectBuilding(clickedName);

        if (buildingId) {
            if (onBuildingClick) onBuildingClick(buildingId);
        } else {
            if (onFloorClick) onFloorClick(e.point);
        }
    };

    const handlePointerOver = (e) => {
        const buildingId = detectBuilding(e.object.name);
        if (buildingId) {
            document.body.style.cursor = 'pointer';
            if (onBuildingHover) onBuildingHover(buildingId);

            // Highlight effect
            if (e.object.material && e.object.material.emissive) {
                e.object.material.emissive.setHex(0x4488ff);
            }
        }
    };

    const handlePointerOut = (e) => {
        document.body.style.cursor = 'default';
        if (onBuildingHoverOut) onBuildingHoverOut();

        // Reset highlight
        if (e.object.material && e.object.userData.originalEmissive) {
            e.object.material.emissive.copy(e.object.userData.originalEmissive);
        }
    };

    return (
        <primitive
            object={scene}
            position={[0, 0, 0]}
            scale={1}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        />
    );
}

useGLTF.preload(`${ASSET_BASE}models/qcumapv2.glb`);
