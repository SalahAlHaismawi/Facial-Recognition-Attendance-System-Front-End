// "use client";
// import React, { useState} from "react";
// import { useEffect } from "react";
//
// import { Poppins } from "next/font/google";
// import drawing from "../../public/drawing.png";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import { auth } from "../../firebaseConfig";
//
// import {
//   browserLocalPersistence,
//   browserSessionPersistence,
//   getAuth, OAuthProvider,
//   onAuthStateChanged,
//   setPersistence,
//   signInWithEmailAndPassword,
//   signInWithPopup
// } from "firebase/auth";
//
// import { useRouter } from "next/navigation";
//
// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const router = useRouter()
//   const [rememberMe, setRememberMe] = useState(false); // Initially unchecked
//
//   const [password, setPassword] = useState("");
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                     router.push('/student-dashboard');
//             }
//     });
//
//     return () => {
//         unsubscribe();
//     };
// }, []);
//   const handleRememberMeChange = (event:any) => {
//     setRememberMe(event.target.checked);
//   };
//
//   const handleSignInWithEmail = async (event) => {
//     event.preventDefault();
//     const auth = getAuth();
//
//     if (rememberMe) {
//         await setPersistence(auth, browserLocalPersistence);
//     } else {
//         await setPersistence(auth, browserSessionPersistence);
//     }
//
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         router.push('/student-dashboard'); // Use Next.js router to navigate
//       })
//       .catch((error) => {
//         alert(`Failed to log in: ${error.message}`);
//       });
// };
//
//
//
//   return (
//     <div className="w-screen h-screen flex">
//       <div className="flex flex-row w-1/2 h-screen items-center justify-center bg-[#161A30] ">
//         <div className="w-[50%] ">
//           <h1 className="text-[48px] text-white">Login</h1>
//           <form className="mt-8">
//             <div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-2 px-4 py-2 w-full   text-white bg-Lblack border-b"
//                 placeholder="Enter Your MMU Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-2 px-4 py-2 w-full   text-white bg-Lblack border-b"
//               />
//             </div>
//             <div className="mt-6">
//               {/*add a remember me check box*/}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember_me"
//                     name="remember_me"
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={handleRememberMeChange}
//                     className="h-4 w-4 text-Lpurple focus:ring-Lpurple border-gray-300 rounded"
//                   />
//                   <label
//                     htmlFor="remember_me"
//                     className="ml-2 block text-sm text-white"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="text-sm">
//                   <a
//                     href="#"
//                     className="font-medium text-Lpurple hover:text-LpurpleDark"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//               </div>
//
//             </div>
//           </form>
//         </div>
//       </div>
//       <div className="w-1/2 h-screen flex flex-col items-center justify-center  bg-gradient-to-b from-[#925FE2] to-[#b01dddcc] relative">
//         <h1 className="text-[80px] pb-[600px] text-white ">
//         </h1>
//
//         <Image
//           src={drawing}
//           alt="Image"
//           className="absolute opacity-0.5  pt-[100px]"
//         />
//       </div>
//     </div>
//   );
// };
// export default LoginPage;
