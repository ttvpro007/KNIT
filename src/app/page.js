// // // import Image from "next/image";
// // // import styles from "./page.module.css";

// // // export default function Home() {
// // //   return (
// // //     <div className={styles.page}>
// // //       <main className={styles.main}>
// // //         <Image
// // //           className={styles.logo}
// // //           src="https://nextjs.org/icons/next.svg"
// // //           alt="Next.js logo"
// // //           width={180}
// // //           height={38}
// // //           priority
// // //         />
// // //         <ol>
// // //           <li>
// // //             Get started by editing <code>src/app/page.js</code>.
// // //           </li>
// // //           <li>Save and see your changes instantly.</li>
// // //         </ol>

// // //         <div className={styles.ctas}>
// // //           <a
// // //             className={styles.primary}
// // //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //           >
// // //             <Image
// // //               className={styles.logo}
// // //               src="https://nextjs.org/icons/vercel.svg"
// // //               alt="Vercel logomark"
// // //               width={20}
// // //               height={20}
// // //             />
// // //             Deploy now
// // //           </a>
// // //           <a
// // //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             className={styles.secondary}
// // //           >
// // //             Read our docs
// // //           </a>
// // //         </div>
// // //       </main>
// // //       <footer className={styles.footer}>
// // //         <a
// // //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           <Image
// // //             aria-hidden
// // //             src="https://nextjs.org/icons/file.svg"
// // //             alt="File icon"
// // //             width={16}
// // //             height={16}
// // //           />
// // //           Learn
// // //         </a>
// // //         <a
// // //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           <Image
// // //             aria-hidden
// // //             src="https://nextjs.org/icons/window.svg"
// // //             alt="Window icon"
// // //             width={16}
// // //             height={16}
// // //           />
// // //           Examples
// // //         </a>
// // //         <a
// // //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           <Image
// // //             aria-hidden
// // //             src="https://nextjs.org/icons/globe.svg"
// // //             alt="Globe icon"
// // //             width={16}
// // //             height={16}
// // //           />
// // //           Go to nextjs.org →
// // //         </a>
// // //       </footer>
// // //     </div>
// // //   );
// // // }

// // 'use client'

// // import { Canvas } from '@react-three/fiber'
// // import { XR, createXRStore } from '@react-three/xr'
// // import { useState } from 'react'
// // import { testFunc } from './test'

// // const store = createXRStore()

// // export default function App() {
// //   // const [red, setRed] = useState(false)
// //   return (
// //     // <>
// //     //   <button onClick={() => store.enterAR()}>Enter AR</button>
// //     //   <Canvas>
// //     //     <XR store={store}>
// //     //       <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
// //     //         <boxGeometry />
// //     //         <meshBasicMaterial color={red ? 'red' : 'blue'} />
// //     //       </mesh>
// //     //     </XR>
// //     //   </Canvas>
// //     // </>
// //     <testFunc />
// //   )
// // }

// 'use client'

// import { useEffect, useRef } from 'react';
// import { videoPlayer } from './videoPlayer'; // Adjust the path as necessary

// export default function App() {
//   const containerRef = useRef();

//   useEffect(() => {
//     // Initialize the Three.js scene
//     const cleanup = videoPlayer(containerRef);

//     return () => {
//       // Cleanup on unmount
//       cleanup();
//     };
//   }, []);

//   return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
// }

// 'use client'

// // pages/index.js
// import XRMusicPlayer from '../components/test';

// export default function Home() {
//   return (
//     <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <XRMusicPlayer />
//     </div>
//   );
// }

'use client'

import App from "./app"

export default function Home() {
  return (
    <App />
  )
}
