import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

// Reusable 3D Button Component
const ThreeDButton = ({ 
    position = [0, 0, -2], 
    color = 0xff0000, 
    size = [0.5, 0.2, 0.1], 
    onClick = () => {} 
}) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        camera.position.z = 3;

        // Create a 3D Button (a Box)
        const geometry = new THREE.BoxGeometry(...size);
        const material = new THREE.MeshBasicMaterial({ color });
        const button = new THREE.Mesh(geometry, material);
        button.position.set(...position);
        scene.add(button);

        // Add Click Event Listener
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObject(button);
            if (intersects.length > 0) {
                onClick();
            }
        };
        window.addEventListener("click", handleClick);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener("click", handleClick);
        };
    }, [position, color, size, onClick]);

    return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />;
};

export default ThreeDButton;
