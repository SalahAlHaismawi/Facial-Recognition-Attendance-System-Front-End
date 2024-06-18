import React, {useState} from 'react';
import Image from "next/image";
import Microsoft from "@/public/icons/Microsoft.png";
import {motion} from "framer-motion";
import {OAuthProvider, signInWithPopup} from "firebase/auth";
import {auth, db} from "@/firebaseConfig";
import {useRouter} from "next/navigation";
import {doc, getDoc, setDoc} from "@firebase/firestore";
import VisionCafe from '../../../public/Visioncafe.png';

const MyComponent = () => {
    const heroText= 'Integrate Face Detection and Recognition Into your existing CCTV Network, Hassle Free.'.split(' ');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // const signInWithMicrosoft = async () => {
    //     setIsLoading(true); // Start loading
    //     const provider = new OAuthProvider('microsoft.com');
    //
    //     try {
    //         const result = await signInWithPopup(auth, provider);
    //         const user = result.user;
    //
    //         // Extract student ID from email (assuming email format is studentId@domain.com)
    //         const studentId = user.email.split('@')[0];
    //         const studentName = user.displayName || 'Unnamed';
    //         const studentPassword = '1234'; // This should be set securely in a real-world scenario
    //
    //         // Check if user already exists in Firestore
    //         const userDocRef = doc(db, 'Students', studentId); // Use studentId as the document ID
    //         const userDoc = await getDoc(userDocRef);
    //
    //         if (!userDoc.exists()) {
    //             // Store additional user data in Firestore
    //             await setDoc(userDocRef, {
    //                 student_id: studentId,
    //                 student_name: studentName,
    //                 student_password: studentPassword,
    //                 email: user.email,
    //                 photoURL: user.photoURL
    //             });
    //         } else {
    //             // Update existing user data if needed
    //             await setDoc(userDocRef, {
    //                 student_id: studentId,
    //                 student_name: studentName,
    //                 student_password: studentPassword,
    //                 email: user.email,
    //                 photoURL: user.photoURL
    //             }, { merge: true });
    //         }
    //
    //         console.log('User signed in: ', user);
    //         // Redirect to the dashboard
    //         router.push('/student-dashboard');
    //         return user; // Return the user so the calling component can handle routing
    //     } catch (error) {
    //         console.error('Authentication failed: ', error);
    //         alert('Login failed: ' + error.message);
    //         throw new Error('Login failed: ' + error.message);
    //     } finally {
    //         setIsLoading(false); // End loading
    //     }
    // };

    return (
        <div className='flex flex-col items-center min-h-screen pl-10 pr-10 pb-10 max-w-screen'>
            {/* Loading Screen */}
            {isLoading && (
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
                    <div className='text-white text-lg font-bold'>Loading...</div>
                </div>
            )}

            <div className='w-full flex flex-row justify-between my-auto'>
                <div className='max-w-[100px] flex lg:max-w-[150px]'>
                    <Image
                        src={VisionCafe}
                        className='mt-3'
                        alt='Vision Cafe'
                    />
                </div>

                <button
                    type='submit'
                    className='w-[120px] h-[50px] flex flex-row justify-between items-center p-2 border border-transparent rounded-xl shadow-lg text-md font-medium text-white bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] my-auto'
                >
                    <a href='/login' className='text-md'>Sign In</a>
                    <Image src={Microsoft} alt={'login-microsoft'} />
                </button>
            </div>

            <div className='flex flex-grow items-center justify-center w-full '>
                <div className='w-full text-white mx-auto flex items-center  gap-3 flex-wrap '>
                    {heroText.map((el, i) => (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='text-3xl lg:text-6xl font-bold text-center'
                            transition={{
                                duration: 0.7,
                                delay: i / 10,
                            }}
                            key={i}
                        >
                            {el}{' '}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyComponent;