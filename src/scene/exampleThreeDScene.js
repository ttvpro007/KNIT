import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';

const ExampleThreeDScene = () => {
    const containerRef = useRef(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [lon, setLon] = useState(0);
    const [lat, setLat] = useState(0);
    const distance = 0.5;

    useEffect(() => {
        let camera, scene, renderer;
        let phi = 0, theta = 0;
        let onPointerDownPointerX = 0, onPointerDownPointerY = 0;
        let onPointerDownLon = 0, onPointerDownLat = 0;

        const init = () => {
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.25, 10);
            scene = new THREE.Scene();

            const geometry = new THREE.SphereGeometry(5, 60, 40);
            geometry.scale(-1, 1, 1);

            let video = document.getElementById('threejs-video');
            // if (!video) {
            //     video = document.createElement('video');
            //     video.id = 'threejs-video';
            //     video.src = '/textures/MaryOculus.mp4'; // Replace with actual video path
            //     video.crossOrigin = 'anonymous';
            //     video.loop = true;
            //     video.muted = false;
            //     video.autoplay = false;
            //     video.preload = 'auto';
            //     document.body.appendChild(video);
            // }
            video.play();

            const texture = new THREE.VideoTexture(video);
            texture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.MeshBasicMaterial({ map: texture });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setAnimationLoop(animate);

            containerRef.current.appendChild(renderer.domElement);

            window.addEventListener('resize', onWindowResize);
            document.addEventListener('pointerdown', onPointerDown);
            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const onPointerDown = (event) => {
            setIsUserInteracting(true);
            onPointerDownPointerX = event.clientX;
            onPointerDownPointerY = event.clientY;
            onPointerDownLon = lon;
            onPointerDownLat = lat;
        };

        const onPointerMove = (event) => {
            if (isUserInteracting) {
                setLon((onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon);
                setLat((onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat);
            }
        };

        const onPointerUp = () => {
            setIsUserInteracting(false);
        };

        const animate = () => {
            setLat(Math.max(-85, Math.min(85, lat)));
            phi = THREE.MathUtils.degToRad(90 - lat);
            theta = THREE.MathUtils.degToRad(lon);

            camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
            camera.position.y = distance * Math.cos(phi);
            camera.position.z = distance * Math.sin(phi) * Math.sin(theta);
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };

        init();

        return () => {
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            containerRef.current.removeChild(renderer.domElement);
        };
    }, [lon, lat, isUserInteracting]);

    return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ExampleThreeDScene;
