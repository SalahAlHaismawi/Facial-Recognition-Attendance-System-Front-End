'use client'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';
import useProtectedRoute from '@/context/useProtectedRoute';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage, db } from '@/firebaseConfig'; // Import storage and Firestore
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
    useProtectedRoute();
    const { user, isLoading } = useContext(AuthContext); // Get user from context
    const [captureUrls, setCaptureUrls] = useState<string[]>([]);
    const [userData, setUserData] = useState<any>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const email = user.email;
                const studentId = email.split('@')[0];
                console.log('studentId:', studentId); // Debug log for actual student ID

                // Fetch user data from Firestore
                const userDocRef = doc(db, "Students", studentId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log('No user data found');
                }

                // Fetch captures from Firebase Storage
                const folderRef = ref(storage, `${studentId}`); // Path to the folder

                try {
                    const result = await listAll(folderRef);
                    console.log('result:', result);

                    if (result.items.length > 0) {
                        // Get all download URLs
                        const urls = await Promise.all(result.items.map(async (itemRef) => {
                            const url = await getDownloadURL(itemRef);
                            console.log('url:', url);
                            return url;
                        }));
                        setCaptureUrls(urls);
                    } else {
                        console.log('No items found in folder');
                    }
                } catch (error) {
                    console.error('Error fetching the capture images:', error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const email = user?.email;
            const studentId = email?.split('@')[0];
            const fileRef = ref(storage, `${studentId}/${file.name}`);

            setUploading(true);
            try {
                await uploadBytes(fileRef, file);
                const url = await getDownloadURL(fileRef);
                setCaptureUrls((prevUrls) => [...prevUrls, url]);
                console.log('File uploaded successfully:', url);
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleDelete = async (url: string) => {
        const email = user?.email;
        const studentId = email?.split('@')[0];
        const decodedUrl = decodeURIComponent(url);
        const fileName = decodedUrl.substring(decodedUrl.lastIndexOf('/') + 1, decodedUrl.indexOf('?'));
        const fileRef = ref(storage, `${studentId}/${fileName}`);

        try {
            await deleteObject(fileRef);
            setCaptureUrls((prevUrls) => prevUrls.filter((captureUrl) => captureUrl !== url));
            console.log('File deleted successfully:', url);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="h-screen overflow-y-auto p-5">
            <div className="bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white p-4 rounded-lg shadow-md">
                {userData && (
                    <div className="mb-2">
                        <p className="text-sm"><strong>Name:</strong> {userData.student_name}</p>
                        <p className="text-sm"><strong>Student ID:</strong> {userData.student_id}</p>
                        <p className="text-sm"><strong>Email:</strong> {user.email}</p>
                    </div>
                )}
            </div>
            <h2 className="text-white mt-4 text-lg">Face Recognition Pictures:</h2>
            <div className="flex flex-wrap gap-2 p-2">
                {captureUrls.length > 0 ? (
                    captureUrls.map((url, index) => (
                        <div key={index} className="relative p-1 bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-lg w-full sm:w-1/4 md:w-1/5 transition-opacity duration-500 ease-in-out transform">
                            <Image src={url} alt={`Capture ${index + 1}`} width={150} height={150} className="w-full h-auto rounded-lg object-cover" />
                            <button
                                onClick={() => handleDelete(url)}
                                className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                X
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='text-white'>No captures available</p>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-white mb-2">Upload New Picture:</label>
                <input type="file" onChange={handleUpload} disabled={uploading} className="block w-full text-white"/>
                {uploading && <p className="text-white">Uploading...</p>}
            </div>
        </div>
    );
};

export default Profile;
