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

import React, { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        // Load Delight VR script
        const script = document.createElement('script');
        script.src = '//cdn.delight-vr.com/latest/dl8-9ec78c241d3706ae66d6c851976f6d877878e89c.js';
        script.async = true;
        document.body.appendChild(script);

        // Add Metadata for Customization
        const metadata = [
            { name: 'dl8-customization-primary-color', content: '#ec1b2d' },
            { name: 'dl8-customization-brand-name', content: 'Your Brand Name' },
            { name: 'dl8-customization-brand-logo', content: 'your-brand-logo.png' },
            { name: 'dl8-customization-brand-url', content: 'https://your-website.com' },
        ];

        metadata.forEach(({ name, content }) => {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
        });

        return () => {
            // Cleanup script and metadata if needed
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <h1>Delight VR Video Player</h1>
            <dl8-video
                title="Example Video"
                author="Jane Doe"
                format="STEREO_360_LR"
            >
                <source src="textures/MaryOculus.mp4" type="video/mp4" />
                <source src="textures/MaryOculus.webm" type="video/webm" />
            </dl8-video>
        </div>
    );
};

export default App;
