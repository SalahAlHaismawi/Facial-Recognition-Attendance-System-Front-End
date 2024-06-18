"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import VisionCafe from "../../public/Visioncafe.png";
import { auth, db } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {useAuth} from "@/app/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setDisplayName: setAuthDisplayName, setUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.emailVerified) {
        router.push('/student-dashboard');
      } else if (user) {
        alert('Please verify your email address.');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignInWithEmail = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email.endsWith('@student.mmu.edu.my')) {
      alert('Please use a valid MMU student email address.');
      setLoading(false);
      return;
    }

    try {
      const authPersistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, authPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert('Please verify your email address. Check your inbox for the verification email.');
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const extractStudentId = (email) => {
    const emailParts = email.split('@');
    if (emailParts.length > 0) {
      return emailParts[0];
    }
    return null;
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    if (!email.endsWith('@student.mmu.edu.my')) {
      alert('Please use a valid MMU student email address.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await updateProfile(userCredential.user, { displayName: displayName });
      const studentId = extractStudentId(email);

      // Create a new document in the "Students" collection
      await setDoc(doc(db, "Students",studentId ), {
        student_id: studentId,
        student_name: displayName,
        student_email: email
      });

      alert('Please check your email for verification link.');
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="w-screen h-screen bg-gradient-to-b from-[#6707FF] to-[#b01dddcc]">
        <div className="w-full justify-center">
          <div className="flex flex-col items-center p-10">
            <div>
              <Image src={VisionCafe} alt="Logo" />
            </div>
            {isRegister ? (
                <form className="mt-8" onSubmit={handleRegister}>
                  <input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter Your MMU Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 px-4 py-2 w-full text-white bg-Lblack border-b"
                  />
                  <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 px-4 py-2 w-full text-white bg-Lblack border-b"
                  />
                  <input
                      id="displayName"
                      type="text"
                      required
                      placeholder="Enter Your Display Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-2 px-4 py-2 w-full text-white bg-Lblack border-b"
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        disabled={loading}
                    >
                      Register
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsRegister(false)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                      Already have an account? Sign In
                    </button>
                  </div>
                </form>
            ) : (
                <form className="mt-8" onSubmit={handleSignInWithEmail}>
                  <input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter Your MMU Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 px-4 py-2 w-full text-white bg-Lblack border-b"
                  />
                  <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 px-4 py-2 w-full text-white bg-Lblack border-b"
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <label className="flex items-center text-sm text-white">
                      <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-Lpurple focus:ring-Lpurple border-gray-300 rounded"
                      />
                      Remember me
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={loading}
                    >
                      Sign In
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsRegister(true)}
                        className="text-green-500 hover:text-green-700"
                    >
                      Don't have an account? Register
                    </button>
                  </div>
                </form>
            )}
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
