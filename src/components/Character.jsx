import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ASSET_BASE = import.meta.env.BASE_URL || '/';

export default function Character({ targetPosition, controlsRef }) {
    const group = useRef();
    const { scene, animations } = useGLTF(`${ASSET_BASE}models/qcu_student_1.glb`);
    const { actions, names } = useAnimations(animations, group);
    const [currentAction, setCurrentAction] = useState('Idle');
    const armBonesRef = useRef([]);

    // Find and store arm bones on mount
    useEffect(() => {
        if (scene) {
            const armBones = [];
            scene.traverse((child) => {
                if (child.isBone) {
                    const boneName = child.name.toLowerCase();
                    if (boneName.includes('arm') ||
                        boneName.includes('hand') ||
                        boneName.includes('shoulder') ||
                        boneName.includes('wrist') ||
                        boneName.includes('finger')) {
                        armBones.push(child);
                    }
                }
            });
            armBonesRef.current = armBones;

            armBones.forEach(bone => {
                bone.userData.initialRotation = bone.rotation.clone();
            });
        }
    }, [scene]);

    useEffect(() => {
        const action = actions[currentAction];
        if (action) {
            action.reset().fadeIn(0.2).play();
            return () => action.fadeOut(0.2);
        }
    }, [currentAction, actions]);

    useFrame((state, delta) => {
        if (!group.current) return;

        const playerPos = group.current.position;
        const startPos = playerPos.clone();

        // Handle Movement
        if (targetPosition) {
            const target = new THREE.Vector3(targetPosition.x, 0, targetPosition.z);
            const distance = playerPos.distanceTo(target);
            const stopThreshold = 0.1;

            if (distance > stopThreshold) {
                const speed = 1;
                const direction = target.clone().sub(playerPos).normalize();

                const moveStep = speed * delta;
                if (moveStep < distance) {
                    playerPos.add(direction.multiplyScalar(moveStep));
                } else {
                    playerPos.copy(target);
                }

                const lookTarget = new THREE.Vector3(target.x, playerPos.y, target.z);
                group.current.lookAt(lookTarget);

                if (currentAction !== 'walking') {
                    const moveAnim = names.find(n => /walk/i.test(n)) || names.find(n => /run/i.test(n)) || names[0];
                    setCurrentAction(moveAnim);
                }
            } else {
                if (currentAction !== 'Idle') {
                    setCurrentAction('Idle');
                }
            }
        }

        // Freeze arm movement
        armBonesRef.current.forEach(bone => {
            if (bone.userData.initialRotation) {
                bone.rotation.copy(bone.userData.initialRotation);
            }
        });

        // Update camera to follow character
        if (controlsRef && controlsRef.current) {
            const displacement = playerPos.clone().sub(startPos);
            state.camera.position.add(displacement);
            controlsRef.current.target.copy(playerPos);
            controlsRef.current.update();
        }
    });

    return <primitive ref={group} object={scene} scale={0.003} />;
}

useGLTF.preload(`${ASSET_BASE}models/qcu_student_1.glb`);
