// utils/threeVR.js

'use client'

import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

export function videoPlayer(containerRef) {
  let camera, scene, renderer, video;

  function init() {
    const container = containerRef.current;

    // Camera setup
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    camera.layers.enable(1); // Render left view when no stereo available

    // Video setup
    video = document.createElement('video');
    video.src = '/textures/MaryOculus.mp4'; // Place your video in the public/textures folder
    video.loop = true;
    video.muted = true;
    video.crossOrigin = 'anonymous';
    video.playsInline = true;
    video.style.display = 'none';
    document.body.appendChild(video);
    video.play();

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);

    // Left Sphere
    const geometry1 = new THREE.SphereGeometry(500, 60, 40);
    geometry1.scale(-1, 1, 1);

    const uvs1 = geometry1.attributes.uv.array;
    for (let i = 0; i < uvs1.length; i += 2) {
      uvs1[i] *= 0.5;
    }

    const material1 = new THREE.MeshBasicMaterial({ map: texture });
    const mesh1 = new THREE.Mesh(geometry1, material1);
    mesh1.rotation.y = -Math.PI / 2;
    mesh1.layers.set(1); // Display in left eye only
    scene.add(mesh1);

    // Right Sphere
    const geometry2 = new THREE.SphereGeometry(500, 60, 40);
    geometry2.scale(-1, 1, 1);

    const uvs2 = geometry2.attributes.uv.array;
    for (let i = 0; i < uvs2.length; i += 2) {
      uvs2[i] *= 0.5;
      uvs2[i] += 0.5;
    }

    const material2 = new THREE.MeshBasicMaterial({ map: texture });
    const mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.rotation.y = -Math.PI / 2;
    mesh2.layers.set(2); // Display in right eye only
    scene.add(mesh2);

    // Renderer setup
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local');
    container.appendChild(renderer.domElement);

    // VR Button
    document.body.appendChild(VRButton.createButton(renderer));

    // Handle resizing
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  init();
  animate();

  return () => {
    // Cleanup logic
    window.removeEventListener('resize', onWindowResize);
    video.remove();
  };
}
