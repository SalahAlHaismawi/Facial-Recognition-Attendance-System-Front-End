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
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setDisplayName: setAuthDisplayName, setUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        router.push("/student-dashboard");
      } else if (user) {
        alert("Please verify your email address.");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignInWithEmail = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email.endsWith("@student.mmu.edu.my")) {
      alert("Please use a valid MMU student email address.");
      setLoading(false);
      return;
    }

    try {
      const authPersistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, authPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        alert("Please verify your email address. Check your inbox for the verification email.");
      }
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractStudentId = (email) => {
    const emailParts = email.split("@");
    if (emailParts.length > 0) {
      return emailParts[0];
    }
    return null;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!email.endsWith("@student.mmu.edu.my")) {
      alert("Please use a valid MMU student email address.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await updateProfile(userCredential.user, { displayName: displayName });
      const studentId = extractStudentId(email);

      // Create a new document in the "Students" collection
      await setDoc(doc(db, "Students", studentId), {
        student_id: studentId,
        student_name: displayName,
        student_email: email,
      });

      alert("Please check your email for verification link.");
      router.push("/login");
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="w-screen h-screen  bg-gradient-to-b from-[#F38E3C] to-[#EB573F]  flex items-center justify-center">
        <div className="bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] shadow-md rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-center mb-8">
            <Image src={VisionCafe} alt="Logo" width={150} height={150} />
          </div>
          {isRegister ? (
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter Your MMU Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="mb-4">
                  <input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="mb-4">
                  <input
                      id="displayName"
                      type="text"
                      required
                      placeholder="Enter Your Display Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
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
              <form onSubmit={handleSignInWithEmail}>
                <div className="mb-4">
                  <input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter Your MMU Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="mb-4">
                  <input
                      id="password"
                      type="password"
                      required
                      placeholder="Enter Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      disabled={loading}
                  >
                    Sign In
                  </button>
                </div>
                <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="text-green-500 hover:text-green-700"
                >
                  Don't have an account? Register
                </button>
              </form>
          )}
        </div>
      </div>
  );
};

export default LoginPage;
