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

                        // FIX TRANSPARENCY/DEPTH ISSUES
                        // Disable transparency if the material doesn't need it
                        if (material.opacity === 1 && !material.alphaMap) {
                            material.transparent = false;
                        }

                        // Ensure depth write is enabled (fixes overlapping/see-through issue)
                        material.depthWrite = true;
                        material.depthTest = true;

                        // Use DoubleSide for ground/floor surfaces to ensure visibility
                        // FrontSide can cause some surfaces to disappear
                        material.side = THREE.DoubleSide;

                        // Fix alpha test for textures with transparency
                        if (material.map && material.map.format === THREE.RGBAFormat) {
                            material.alphaTest = 0.1;
                        }

                        // Ensure proper tone mapping and encoding
                        if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
                            // Boost metalness and roughness for better appearance
                            if (material.metalness === undefined) material.metalness = 0;
                            if (material.roughness === undefined) material.roughness = 0.8;
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
