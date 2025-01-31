import ThreeDButton from "@/components/threeDButton";

// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import ThreeJSVideoPlayer from "@/components/videoPlayer"

// const App = () => {
//   const mountRef = useRef(null);
//   const videoPlayerRef = useRef(null); // To reference the ThreeJSVideoPlayer instance
//   const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

//   useEffect(() => {
//     // Set up the scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Set camera position
//     camera.position.z = 5;

//     // Create a video player instance
//     const videoPlayer = new ThreeJSVideoPlayer({
//       source: 'textures/MaryOculus.mp4', // Replace with the actual video path
//       muted: false,
//       autoplay: false,
//       loop: true,
//       volume: 0.5,
//       scale: 3.0
//     });

//     // Save reference to video player
//     videoPlayerRef.current = videoPlayer;

//     // Add the video player to the scene
//     scene.add(videoPlayer);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle cleanup
//     return () => {
//       videoPlayer.dispose();
//       renderer.dispose();
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   const handlePlay = () => {
//     if (videoPlayerRef.current) {
//       videoPlayerRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   const handlePause = () => {
//     if (videoPlayerRef.current) {
//       videoPlayerRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div>
//       <div ref={mountRef} style={{ width: '100vw', height: '90vh' }} />
//       <div style={{ textAlign: 'center', marginTop: '10px' }}>
//         <script src="//cdn.delight-vr.com/latest/dl8-9ec78c241d3706ae66d6c851976f6d877878e89c.js" async></script>
//         <button onClick={handlePlay} disabled={isPlaying}>
//           Play
//         </button>
//         <button onClick={handlePause} disabled={!isPlaying}>
//           Pause
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const ThreeDButton = () => {
//     const mountRef = useRef(null);

//     useEffect(() => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         mountRef.current.appendChild(renderer.domElement);

//         camera.position.z = 3;

//         // Create a 3D Button (a Box)
//         const geometry = new THREE.BoxGeometry(0.5, 0.2, 0.1);
//         const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//         const button = new THREE.Mesh(geometry, material);
//         button.position.set(0, 0, -2); // Position in front of the camera
//         scene.add(button);

//         // Add Click Event Listener
//         const raycaster = new THREE.Raycaster();
//         const mouse = new THREE.Vector2();

//         const onClick = (event) => {
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//             raycaster.setFromCamera(mouse, camera);

//             const intersects = raycaster.intersectObject(button);
//             if (intersects.length > 0) {
//                 console.log("3D Button Clicked!");
//             }
//         };
//         window.addEventListener("click", onClick);

//         const animate = () => {
//             requestAnimationFrame(animate);
//             // button.rotation.y += 0.01; // Rotate the button for effect
//             renderer.render(scene, camera);
//         };
//         animate();

//         return () => {
//             mountRef.current.removeChild(renderer.domElement);
//             window.removeEventListener("click", onClick);
//         };
//     }, []);

//     return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />;
// };

// const App = () => {
//     useEffect(() => {
//         // Load Delight VR script
//         const script = document.createElement('script');
//         script.src = 'https://cdn.delight-vr.com/latest/dl8-9ec78c241d3706ae66d6c851976f6d877878e89c.js';
//         script.async = true;
//         document.body.appendChild(script);

//         // Add Metadata for Customization
//         const metadata = [
//             { name: 'dl8-customization-primary-color', content: '#ec1b2d' },
//             { name: 'dl8-customization-brand-name', content: 'Your Brand Name' },
//             { name: 'dl8-customization-brand-logo', content: 'your-brand-logo.png' },
//             { name: 'dl8-customization-brand-url', content: 'https://your-website.com' },
//         ];

//         metadata.forEach(({ name, content }) => {
//             const meta = document.createElement('meta');
//             meta.name = name;
//             meta.content = content;
//             document.head.appendChild(meta);
//         });

//         return () => {
//             // Cleanup script and metadata if needed
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <div>
//             <h1>Delight VR Video Player</h1>
//             <dl8-video
//                 title="Example Video"
//                 author="Jane Doe"
//                 format="STEREO_360_LR"
//             >
//                 <source src="textures/MaryOculus.mp4" type="video/mp4" />
//                 <source src="textures/MaryOculus.webm" type="video/webm" />
//             </dl8-video>

//             <ThreeDButton />
//         </div>
//     );
// };

// export default App;

// import React, { useEffect, useRef } from 'react';

// const App = () => {
//     useEffect(() => {
//         // Load Delight VR script
//         const script = document.createElement('script');
//         script.src = 'https://cdn.delight-vr.com/latest/dl8-9ec78c241d3706ae66d6c851976f6d877878e89c.js';
//         script.async = true;
//         document.body.appendChild(script);

//         // Add Metadata for Customization
//         const metadata = [
//             { name: 'dl8-customization-primary-color', content: '#ec1b2d' },
//             { name: 'dl8-customization-brand-name', content: 'Your Brand Name' },
//             { name: 'dl8-customization-brand-logo', content: 'your-brand-logo.png' },
//             { name: 'dl8-customization-brand-url', content: 'https://your-website.com' },
//         ];

//         metadata.forEach(({ name, content }) => {
//             const meta = document.createElement('meta');
//             meta.name = name;
//             meta.content = content;
//             document.head.appendChild(meta);
//         });

//         return () => {
//             // Cleanup script and metadata if needed
//             document.body.removeChild(script);
//             metadata.forEach(({ name }) => {
//                 const meta = document.querySelector(`meta[name="${name}"]`);
//                 if (meta) document.head.removeChild(meta);
//             });
//         };
//     }, []);

//     return (
//         <div>
//             <h1>Delight VR Video Player</h1>
//             <dl8-video
//                 title="Example Video"
//                 author="Jane Doe"
//                 format="STEREO_360_LR"
//             >
//                 <source src="textures/MaryOculus.mp4" type="video/mp4" />
//                 <source src="textures/MaryOculus.webm" type="video/webm" />
//             </dl8-video>

//             {/* 3D Start Button */}
//             <ThreeDButton position={[0.5, 0, -2]} color={0x00ff00} size={[0.6, 0.3, 0.1]} action="start" />

//             {/* 3D Exit Button */}
//             <ThreeDButton position={[-0.5, 0, -2]} color={0xff0000} size={[0.6, 0.3, 0.1]} action="exit" />
//         </div>
//     );
// };

// export default App;

import React, { useEffect, useRef } from 'react';
import ThreeDScene from "@/scene/threeDScene";
import ExampleThreeDScene from "@/scene/exampleThreeDScene";
import ThreeVRViewer from "@/scene/threeVRViewer";

const App = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) {
            const video = document.createElement('video');
            video.id = "threejs-video";
            video.src = "/textures/MaryOculus.mp4"; // Replace with actual video path
            video.crossOrigin = "anonymous";
            video.loop = true;
            video.muted = false;
            video.autoplay = false;
            video.preload = "auto";
            document.body.appendChild(video);
            videoRef.current = video;
        }
    }, []);

    return (
        <div>
            {/* {videoRef.current && <ThreeDScene videoElement={videoRef.current} />} */}
            {/* <ExampleThreeDScene /> */}
            <ThreeVRViewer videoPath={"/textures/MaryOculus.mp4"}/>
        </div>
    );
};

export default App;

