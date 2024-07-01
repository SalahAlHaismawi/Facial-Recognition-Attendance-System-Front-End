'use client'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import AttendanceBox from '@/app/components/shared/AttendanceBox';
import Account from '../../public/icons/Account.png';
import {AuthContext, AuthProvider, useAuth} from '@/app/context/AuthContext';
import useProtectedRoute from '@/app/context/useProtectedRoute';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import {db, storage,} from '../../firebaseConfig';
import Profile from "@/app/components/shared/Profile"; // Import storage
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {doc, getDoc} from "@firebase/firestore";

const Layout = ({ children }: { children: React.ReactNode }) => {
    useProtectedRoute();
    const { user, isLoading } = useContext(AuthContext); // Get user from context
    const [captureUrls, setCaptureUrls] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // State to manage expanded view
    const [subjectsAttendance, setSubjectsAttendance] = useState([]);
    const { displayName } = useAuth();

    const [studentName, setStudentName] = useState('');
    const fetchStudentName = async (studentId: string): Promise<string> => {
        const studentDocRef = doc(db, 'Students', studentId);
        const studentDoc = await getDoc(studentDocRef);
        if (studentDoc.exists()) {
            const studentData = studentDoc.data();
            console.log(studentData);
            return studentData.student_name || 'Unnamed';
        } else {
            console.log('No such document!');
            return 'Unnamed';
        }
    };

    useEffect(() => {
        const fetchCaptures = async () => {
            if (user) {
                // Extract student ID from email (assuming email format is studentId@domain.com)
                const email = user.email;
                const studentId = email.split('@')[0];
                const studentName = await fetchStudentName(studentId);
                setStudentName(studentName);
                console.log('student_name',studentName)
                console.log('studentId:', studentId); // Debug log for actual student ID

                const folderRef = ref(storage, `${studentName}`); // Path to the folder

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

        fetchCaptures();
    }, [user]);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const fetchStudentSubjectsAndAttendance = async (studentId) => {
        const subjects = [];
        const subjectsRef = collection(db, 'Subjects'); // Assuming 'Subjects' is your collection
        const q = query(subjectsRef, where('student_id_list', 'array-contains', studentId));

        const subjectSnapshot = await getDocs(q);
        subjectSnapshot.forEach(doc => {
            subjects.push(doc.data());
        });

        // Fetch attendance for each subject
        const attendanceRef = collection(db, 'Attendance');
        const attendancePromises = subjects.map(async subject => {
            const attendanceQuery = query(attendanceRef, where('subject_id', '==', subject.subject_id), where('week', '==', 'Week 1'));
            const attendanceSnapshot = await getDocs(attendanceQuery);
            let totalSessions = 0;
            let attendedSessions = 0;
            attendanceSnapshot.forEach(doc => {
                totalSessions++;
                if (doc.data().students_attended.includes(studentId)) {
                    attendedSessions++;
                }
            });
            return {
                subject_name: subject.subject_name,
                attendance_percentage: (attendedSessions / totalSessions) * 100
            };
        });

        return Promise.all(attendancePromises);
    };

    useEffect(() => {
        if (user) {
            const studentId = user.email.split('@')[0]; // Ensure email format gives correct ID
            fetchStudentSubjectsAndAttendance(studentId)
                .then(subjects => {
                    setSubjectsAttendance(subjects); // Set the fetched subjects with their attendance
                })
                .catch(error => console.error('Failed to fetch subjects or attendance:', error));
        }
    }, [user]);
    return (
        <AuthProvider>

            <div className="flex flex-col h-screen overflow-y-scroll pt-10">
                <div className='flex flex-row-reverse gap-5 justify-between p-5'>
                    <Link href="/profile">
                        <div className='flex flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] p-4 w-[65px] h-[65px] cursor-pointer'>
                            <Image src={Account} alt={'Account'} className='w-10 h-10 object-cover rounded-full'/>
                        </div>
                    </Link>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-sm w-full rounded-xl p-2'>
                        <h1>
                            {isLoading ? 'Loading...' : user ? `Welcome Back, ${displayName}!` : 'Welcome Back, Guest!'}                        </h1> {/* Display username */}
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className='max-w-screen'>
                        <AttendanceBox/>
                    </div>
                    <div className='flex w-full justify-between p-5'>
                        <p className='text-white text-center'>Captures:</p>

                        {captureUrls.length > 0 && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleToggleExpand}
                                    className="text-white bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] p-2 rounded-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
                                >
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={`flex flex-wrap gap-5 p-4 transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                        {captureUrls.length > 0 && (
                            captureUrls.map((url, index) => (
                                <div key={index} className={`p-2 bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-xl w-full sm:w-1/3 md:w-1/4 lg:w-1/5 transition-opacity duration-500 ease-in-out transform ${isExpanded ? 'animate-fadeInScale' : 'opacity-0'}`}>
                                    <Image src={url} alt={`Capture ${index + 1}`} width={200} height={200} className="w-full h-auto rounded-lg object-cover" />
                                </div>
                            ))
                        )}
                    </div>

                </div>

                <div className="flex-grow">
                    {children}
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeInScale {
                    0% {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeInScale {
                    animation: fadeInScale 0.5s ease-in-out forwards;
                }
            `}</style>
        </AuthProvider>
    );
};

export default Layout;
