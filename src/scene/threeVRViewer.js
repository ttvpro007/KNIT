import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton";

const ThreeVRViewer = ({ videoPath }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  let raycaster, controller, intersectedButton = null;

  useEffect(() => {
    let camera, scene, renderer;
    let video = videoRef.current;
    let container = containerRef.current;

    if (!video || !container) {
      console.error("Video or Container not found!");
      return;
    }

    function init() {
      container.addEventListener("click", () => {
        if (video.paused) {
          video.play();
        }
      });

      // Camera
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
      camera.layers.enable(1); // Render left view

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101010);

      // Video Texture
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;

      // Left Eye Sphere
      const geometry1 = new THREE.SphereGeometry(500, 60, 40);
      geometry1.scale(-1, 1, 1); // Flip inside out
      const uvs1 = geometry1.attributes.uv.array;
      for (let i = 0; i < uvs1.length; i += 2) uvs1[i] *= 0.5;
      const material1 = new THREE.MeshBasicMaterial({ map: texture });
      const mesh1 = new THREE.Mesh(geometry1, material1);
      mesh1.rotation.y = -Math.PI / 2;
      mesh1.layers.set(1); // Left eye only
      scene.add(mesh1);

      // Right Eye Sphere
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
      mesh2.layers.set(2); // Right eye only
      scene.add(mesh2);

      // Add 3D Buttons
      scene.add(new ThreeDButton({ position: [-1, -1, -2], color: 0x00ff00, onClick: handlePlayPause }));
      scene.add(new ThreeDButton({ position: [0, -1, -2], color: 0xff0000, onClick: handleRestart }));
      scene.add(new ThreeDButton({ position: [1, -1, -2], color: 0x0000ff, onClick: handleExit }));

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType("local");

      // Raycaster for button interaction
      raycaster = new THREE.Raycaster();
      controller = renderer.xr.getController(0);
      controller.addEventListener("selectstart", onSelectStart);
      scene.add(controller);

      container.appendChild(renderer.domElement);
      document.body.appendChild(VRButton.createButton(renderer));

      // Resize listener
      window.addEventListener("resize", onWindowResize);

      renderer.setAnimationLoop(animate);
    }

    function onSelectStart(event) {
      const controller = event.target;
      raycaster.setFromMatrixPosition(controller.matrixWorld);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const button = intersects[0].object;
        if (button.userData && button.userData.onClick) {
          button.userData.onClick();
        }
      }
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      renderer.render(scene, camera);
    }

    function handlePlayPause() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    function handleRestart() {
      video.currentTime = 0;
      video.play();
    }

    function handleExit() {
      console.log("Exiting VR...");
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (container) container.innerHTML = ""; // Cleanup Three.js elements
    };
  }, [videoPath]); // Re-run when videoPath changes

  return (
    <div>
      <video ref={videoRef} id="video" crossOrigin="anonymous" loop playsInline style={{ display: "none" }}>
        <source src={videoPath} type="video/mp4" />
      </video>
      <div ref={containerRef} id="container" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

// 3D Button Class
class ThreeDButton extends THREE.Mesh {
  constructor({ position, color, onClick }) {
    const geometry = new THREE.BoxGeometry(0.2, 0.1, 0.02);
    const material = new THREE.MeshBasicMaterial({ color });

    super(geometry, material);
    this.position.set(...position);
    this.userData.onClick = onClick;
  }
}

export default ThreeVRViewer;
