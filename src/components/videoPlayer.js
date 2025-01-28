// // utils/threeVR.js

// 'use client'

// import * as THREE from 'three';
// import { VRButton } from 'three/examples/jsm/webxr/VRButton';

// export function videoPlayer(containerRef) {
//   let camera, scene, renderer, video;

//   function init() {
//     const container = containerRef.current;

//     // Camera setup
//     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
//     camera.layers.enable(1); // Render left view when no stereo available

//     // Video setup
//     video = document.createElement('video');
//     video.src = '/textures/MaryOculus.mp4'; // Place your video in the public/textures folder
//     video.loop = true;
//     video.muted = true;
//     video.crossOrigin = 'anonymous';
//     video.playsInline = true;
//     video.style.display = 'none';
//     document.body.appendChild(video);
//     video.play();

//     const texture = new THREE.VideoTexture(video);
//     texture.colorSpace = THREE.SRGBColorSpace;

//     // Scene setup
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x101010);

//     // Left Sphere
//     const geometry1 = new THREE.SphereGeometry(500, 60, 40);
//     geometry1.scale(-1, 1, 1);

//     const uvs1 = geometry1.attributes.uv.array;
//     for (let i = 0; i < uvs1.length; i += 2) {
//       uvs1[i] *= 0.5;
//     }

//     const material1 = new THREE.MeshBasicMaterial({ map: texture });
//     const mesh1 = new THREE.Mesh(geometry1, material1);
//     mesh1.rotation.y = -Math.PI / 2;
//     mesh1.layers.set(1); // Display in left eye only
//     scene.add(mesh1);

//     // Right Sphere
//     const geometry2 = new THREE.SphereGeometry(500, 60, 40);
//     geometry2.scale(-1, 1, 1);

//     const uvs2 = geometry2.attributes.uv.array;
//     for (let i = 0; i < uvs2.length; i += 2) {
//       uvs2[i] *= 0.5;
//       uvs2[i] += 0.5;
//     }

//     const material2 = new THREE.MeshBasicMaterial({ map: texture });
//     const mesh2 = new THREE.Mesh(geometry2, material2);
//     mesh2.rotation.y = -Math.PI / 2;
//     mesh2.layers.set(2); // Display in right eye only
//     scene.add(mesh2);

//     // Renderer setup
//     renderer = new THREE.WebGLRenderer();
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.xr.enabled = true;
//     renderer.xr.setReferenceSpaceType('local');
//     container.appendChild(renderer.domElement);

//     // VR Button
//     document.body.appendChild(VRButton.createButton(renderer));

//     // Handle resizing
//     window.addEventListener('resize', onWindowResize);
//   }

//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   function animate() {
//     renderer.setAnimationLoop(() => {
//       renderer.render(scene, camera);
//     });
//   }

//   init();
//   animate();

//   return () => {
//     // Cleanup logic
//     window.removeEventListener('resize', onWindowResize);
//     video.remove();
//   };
// }
// Import JS libraries

'use client'

import * as THREE from 'three';

class ThreeJSVideoPlayer extends THREE.Mesh {
  constructor({
      source = null,
      muted = false,
      autoplay = false,
      loop = false,
      volume = 1.0,
      scale = 1.0,
      playButtonColor = 0xC1C1C0,
      playButtonTexture = 'textures/play-button-2.png',
  } = {}) {
      const geometry = new THREE.PlaneGeometry(1.0, 1.0);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      super(geometry, material);

      // Private members
      this._state = ThreeJSVideoPlayer.STATES.UNINITIALIZED;
      this._videoElement = document.createElement('video');
      this._playButton = new THREE.Mesh(
          new THREE.PlaneGeometry(0.6, 0.6),
          new THREE.MeshBasicMaterial({
              color: playButtonColor,
              alphaMap: new THREE.TextureLoader().load(playButtonTexture),
              alphaTest: 0.1,
          })
      );
      this._playButton.position.z = 0.001;
      this.add(this._playButton);

      // Configure video element
      this._videoElement.style.display = 'none';
      this._videoElement.setAttribute('preload', 'auto');
      this._videoElement.setAttribute('playsinline', 'playsinline');
      this._videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');
      this._videoElement.muted = muted;
      this._videoElement.autoplay = autoplay;
      this._videoElement.loop = loop;
      this._scale = scale;
      this.setVolume(volume);
      document.body.appendChild(this._videoElement);

      // Event listeners
      this._videoElement.onpause = () => this._playButton.visible = true;
      this._videoElement.onended = () => this._playButton.visible = true;
      this._videoElement.onplay = () => this._playButton.visible = false;

      // Add button click interaction
      this._playButton.userData = { interactable: true };
      this._playButton.visible = true;

      this.setState(ThreeJSVideoPlayer.STATES.NOSOURCE);

      if (source) {
          this.setSource(source);
      }
  }

  static get STATES() {
      return {
          UNINITIALIZED: 0,
          NOSOURCE: 1,
          LOADING: 2,
          READY: 3,
      };
  }

  setState(state) {
      if (!Object.values(ThreeJSVideoPlayer.STATES).includes(state)) return;
      this._state = state;

      switch (state) {
          case ThreeJSVideoPlayer.STATES.NOSOURCE:
              this.material.map = null;
              this.material.needsUpdate = true;
              this.visible = true;
              this._playButton.visible = false;
              break;
          case ThreeJSVideoPlayer.STATES.LOADING:
              break;
          case ThreeJSVideoPlayer.STATES.READY:
              this.geometry.dispose();
              this.geometry = new THREE.PlaneGeometry(
                  (this._videoElement.videoWidth / this._videoElement.videoHeight) * this._scale,
                  1.0 * this._scale
              );
              this.material.map = new THREE.VideoTexture(this._videoElement);
              this.material.map.needsUpdate = true;
              this.material.needsUpdate = true;
              this.visible = true;
              this._playButton.visible = true;
              break;
          default:
              break;
      }
  }

  setSource(source) {
      if (typeof source !== 'string') {
          throw new Error('Source must be a string.');
      }

      this._videoElement.src = source;
      this._videoElement.oncanplay = () => this.setState(ThreeJSVideoPlayer.STATES.READY);

      this.setState(ThreeJSVideoPlayer.STATES.LOADING);
      this._videoElement.load();
  }

  play() {
      if (this._state === ThreeJSVideoPlayer.STATES.READY) {
          this._videoElement.play();
      }
  }

  pause() {
      if (this._state === ThreeJSVideoPlayer.STATES.READY) {
          this._videoElement.pause();
      }
  }

  togglePlayPause() {
      if (this._videoElement.paused) {
          this.play();
      } else {
          this.pause();
      }
  }

  handleButtonClick(raycaster, pointer) {
      // Intersect objects to detect click
      const intersects = raycaster.intersectObject(this._playButton);
      if (intersects.length > 0) {
          this.togglePlayPause();
      }
  }

  setVolume(volume) {
      this._videoElement.volume = Math.min(Math.max(volume, 0), 1);
  }

  setMuted(muted) {
      this._videoElement.muted = Boolean(muted);
  }

  setLoop(loop) {
      this._videoElement.loop = Boolean(loop);
  }

  setAutoplay(autoplay) {
      this._videoElement.autoplay = Boolean(autoplay);
  }

  dispose() {
      this.geometry.dispose();
      this.material.dispose();
      this._videoElement.remove();
  }
}

export default ThreeJSVideoPlayer;
