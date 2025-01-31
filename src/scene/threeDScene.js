import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import ThreeDButton from '@/components/threeDButton';

const ThreeDScene = ({ videoElement }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!videoElement) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        camera.position.z = 3;

        const videoTexture = new THREE.VideoTexture(videoElement);
        const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

        // Create a video screen plane
        const screenGeometry = new THREE.PlaneGeometry(2, 1);
        const screen = new THREE.Mesh(screenGeometry, videoMaterial);
        screen.position.set(0, 0, -3);
        scene.add(screen);

        // Button handlers
        const handlePlayPause = () => {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        };

        const handleRestart = () => {
            videoElement.currentTime = 0;
            videoElement.play();
        };

        const handleExit = () => {
            videoElement.pause();
            videoElement.currentTime = 0;
        };

        // Add 3D Buttons
        scene.add(new ThreeDButton({ position: [-1, -1, -2], color: 0x00ff00, onClick: handlePlayPause }));
        scene.add(new ThreeDButton({ position: [0, -1, -2], color: 0xff0000, onClick: handleRestart }));
        scene.add(new ThreeDButton({ position: [1, -1, -2], color: 0x0000ff, onClick: handleExit }));

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [videoElement]);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />;
};

export default ThreeDScene;
