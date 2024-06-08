'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Import db from your firebaseConfig
import SideBar from '@/app/components/shared/SideBar';
import { AuthProvider } from '../../context/AuthContext';
import useProtectedRoute from '@/context/useProtectedRoute';
import DetectStream from '../components/face-detection/detect-stream';
import { setDoc } from "@firebase/firestore";

const Layout = ({ children }: { children: React.ReactNode }) => {
    useProtectedRoute();

    const [weeks, setWeeks] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [studentIdList, setStudentIdList] = useState([]); // List of all student IDs in the subject
    const [selectedStudentId, setSelectedStudentId] = useState(''); // Selected student ID for manual attendance

    const predefinedSubjects = ["Calculus", "Physics", "Chemistry"]; // Add your predefined subjects here

    useEffect(() => {
        // Fetch all week documents under "Attendance"
        const fetchWeeks = async () => {
            try {
                const attendanceCollectionRef = collection(db, 'Attendance');
                const attendanceSnapshot = await getDocs(attendanceCollectionRef);
                const weekList = attendanceSnapshot.docs.map(doc => doc.id);
                console.log('Weeks:', weekList);
                setWeeks(weekList);
            } catch (error) {
                console.error('Error fetching weeks:', error);
            }
        };

        fetchWeeks();
    }, []);

    useEffect(() => {
        if (selectedWeek) {
            // Set predefined subjects for the selected week
            setSubjects(predefinedSubjects);
            setSelectedSubject(''); // Reset selected subject
            setStudents([]); // Reset students
            setAttendanceData([]); // Reset attendance data
            setStudentIdList([]); // Reset student ID list
        }
    }, [selectedWeek]);

    useEffect(() => {
        if (selectedSubject) {
            // Fetch students and their attendance data for the selected subject in the selected week
            const fetchSubjectData = async () => {
                try {
                    const subjectCollectionRef = collection(db, `Attendance/${selectedWeek}/${selectedSubject}`);
                    const subjectSnapshot = await getDocs(subjectCollectionRef);
                    const studentsList = subjectSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        attended: false // Initialize the attended field
                    }));
                    console.log('Students:', studentsList);
                    setStudents(studentsList);

                    // Fetch student_id_list from the selected subject
                    const subjectDocRef = doc(db, `Subject/${selectedSubject}`);
                    const subjectDoc = await getDoc(subjectDocRef);
                    if (subjectDoc.exists()) {
                        console.log('Subject Data:', subjectDoc.data());
                        setStudentIdList(subjectDoc.data().student_id_list || []);
                    } else {
                        console.log('No subject document found.');
                    }

                    // Assuming attendance data is stored in a specific document in the subject collection
                    const attendanceDocRef = doc(db, `Attendance/${selectedWeek}/${selectedSubject}`, 'attendance');
                    const attendanceDoc = await getDoc(attendanceDocRef);
                    if (attendanceDoc.exists()) {
                        console.log('Attendance Data:', attendanceDoc.data());
                        const attendanceList = attendanceDoc.data().student_id_list || [];
                        setAttendanceData(attendanceList);

                        // Update the students list with the attendance status
                        const updatedStudentsList = studentsList.map(student =>
                            attendanceList.includes(student.student_id) ? { ...student, attended: true } : student
                        );
                        setStudents(updatedStudentsList);
                    } else {
                        console.log('No attendance document found.');
                    }
                } catch (error) {
                    console.error('Error fetching subject data:', error);
                }
            };

            fetchSubjectData();
        }
    }, [selectedSubject]);

    const handleAddAttendance = async () => {
        if (selectedStudentId) {
            try {
                // Fetch student details from the database if not already in the list
                const studentDocRef = doc(db, `Students/${selectedStudentId}`);
                const studentDoc = await getDoc(studentDocRef);

                let studentName = 'Unknown';
                if (studentDoc.exists()) {
                    studentName = studentDoc.data().student_name || 'Unknown';
                }

                const timestamp = new Date().toLocaleString(); // Add current time or fetch from your data

                const attendanceDocRef = doc(db, `Attendance/${selectedWeek}/${selectedSubject}`, selectedStudentId);
                const attendanceDoc = await getDoc(attendanceDocRef);

                if (attendanceDoc.exists()) {
                    // Document exists, update it
                    await updateDoc(attendanceDocRef, {
                        student_id: selectedStudentId,
                        student_name: studentName,
                        time: timestamp
                    });
                } else {
                    // Document does not exist, create it
                    await setDoc(attendanceDocRef, {
                        student_id: selectedStudentId,
                        student_name: studentName,
                        time: timestamp
                    }, { merge: true });
                }

                // Update attendance data state
                const newAttendanceData = [...attendanceData, selectedStudentId];
                setAttendanceData(newAttendanceData);

                // Check if the student is already in the students list
                let existingStudent = students.find(student => student.student_id === selectedStudentId);

                if (!existingStudent) {
                    existingStudent = {
                        student_id: selectedStudentId,
                        student_name: studentName,
                        time: timestamp,
                        attended: true
                    };

                    // Add the new student to the students list
                    setStudents([...students, existingStudent]);
                } else {
                    // Update the existing student's attendance status
                    const updatedStudents = students.map(student =>
                        student.student_id === selectedStudentId ? { ...student, attended: true, time: timestamp } : student
                    );
                    setStudents(updatedStudents);
                }

                setSelectedStudentId(''); // Reset selected student ID
            } catch (error) {
                console.error('Error adding attendance:', error);
            }
        }
    };

    const handleDeleteAttendance = async (studentId) => {
        try {
            const attendanceDocRef = doc(db, `Attendance/${selectedWeek}/${selectedSubject}`, studentId);
            await deleteDoc(attendanceDocRef);

            // Update the local state to remove the deleted student
            const updatedStudents = students.filter(student => student.student_id !== studentId);
            setStudents(updatedStudents);

            const updatedAttendanceData = attendanceData.filter(id => id !== studentId);
            setAttendanceData(updatedAttendanceData);

        } catch (error) {
            console.error('Error deleting attendance:', error);
        }
    };

    return (
        <AuthProvider>
            <div className="flex h-screen w-screen justify-center pt-10">
                <SideBar />
                <div className="flex flex-col flex-grow p-10">
                    <DetectStream />
                    <div >

                        <div className="mb-4 flex justify-between  ">
                            <div>
                                <label htmlFor="weekSelect" className="mr-2 text-white">Select Week:</label>
                                <select
                                    id="weekSelect"
                                    value={selectedWeek}
                                    onChange={(e) => setSelectedWeek(e.target.value)}
                                    className="border p-2"
                                >
                                    <option value="">Select a week</option>
                                    {weeks.map((week) => (
                                        <option key={week} value={week}>
                                            {week}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="studentSelect" className="mr-2 text-white">Add Manual Attendance:</label>
                                <select
                                    id="studentSelect"
                                    value={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    className="border p-2"
                                >
                                    <option value="">Select a student</option>
                                    {studentIdList.map((studentId) => (
                                        <option key={studentId} value={studentId}>
                                            {studentId}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleAddAttendance}
                                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {selectedWeek && (
                            <div className="mb-4">
                                <label htmlFor="subjectSelect" className="mr-2 text-white">Select Subject:</label>
                                <select
                                    id="subjectSelect"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="border p-2"
                                >
                                    <option value="">Select a subject</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {selectedSubject && (
                            <div className="overflow-x-auto">
                                <h2 className='text-white'>Attendance for {selectedSubject}</h2>
                                <table className="min-w-full bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-2">Student ID</th>
                                        <th className="px-4 py-2">Student Name</th>
                                        <th className="px-4 py-2">Time</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{student.student_id}</td>
                                            <td className="border px-4 py-2">{student.student_name}</td>
                                            <td className="border px-4 py-2">{student.time}</td>
                                            <td className="border px-4 py-2">
                                                {attendanceData.includes(student.student_id) || student.attended ? (
                                                    <span className="text-green-500">&#10003;</span>
                                                ) : (
                                                    'Attended'
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    onClick={() => handleDeleteAttendance(student.student_id)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>
                        )}
                    </div>
                    <main className="overflow-auto">{children}</main>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Layout;
