import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function CampusModel() {
    // Load the campus map model
    const { scene } = useGLTF(`${ASSET_BASE}models/qcumapv2.glb`);

    // Fix textures: ensure proper color space and material settings
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                // Enable shadows
                child.castShadow = true;
                child.receiveShadow = true;

                // Fix materials
                if (child.material) {
                    const materials = Array.isArray(child.material) ? child.material : [child.material];

                    materials.forEach((material) => {
                        // Fix texture color space (sRGB for diffuse/albedo maps)
                        if (material.map) {
                            material.map.colorSpace = THREE.SRGBColorSpace;
                            material.map.needsUpdate = true;
                        }

                        // Fix emissive map color space
                        if (material.emissiveMap) {
                            material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
                            material.emissiveMap.needsUpdate = true;
                        }

                        // Ensure material updates
                        material.needsUpdate = true;
                    });
                }
            }
        });
    }, [scene]);

    return (
        <primitive
            object={scene}
            position={[0, 0, 0]}
            scale={1}
        />
    );
}

// Preload the model for better performance
useGLTF.preload(`${ASSET_BASE}models/qcumapv2.glb`);
