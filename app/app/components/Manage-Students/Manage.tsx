'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Import Firestore configuration

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({ student_id: '', student_name: '', email: '' });
    const [newSubject, setNewSubject] = useState({
        subject_id: '',
        subject_name: '',
        lecture_date: '',
        lecture_start_time: '',
        tutorial_date: '',
        tutorial_start_time: '',
        lecturer_id_list: [''],
        student_id_list: []
    });
    const [selectedSubjects, setSelectedSubjects] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsCollection = collection(db, 'Students');
            const studentsSnapshot = await getDocs(studentsCollection);
            const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsList);
        };

        const fetchSubjects = async () => {
            const subjectsCollection = collection(db, 'Subject');
            const subjectsSnapshot = await getDocs(subjectsCollection);
            const subjectsList = subjectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSubjects(subjectsList);
        };

        fetchStudents();
        fetchSubjects();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleAddStudent = async () => {
        const studentsCollection = collection(db, 'Students');
        const newDoc = await addDoc(studentsCollection, newStudent);
        setStudents([...students, { id: newDoc.id, ...newStudent }]);
        setNewStudent({ student_id: '', student_name: '', email: '' });
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setNewStudent(student);
    };

    const handleUpdateStudent = async () => {
        const studentDoc = doc(db, 'Students', editingStudent.id);
        await updateDoc(studentDoc, newStudent);
        setStudents(students.map(student => (student.id === editingStudent.id ? { id: editingStudent.id, ...newStudent } : student)));
        setEditingStudent(null);
        setNewStudent({ student_id: '', student_name: '', email: '' });
    };

    const handleDeleteStudent = async (studentId) => {
        await deleteDoc(doc(db, 'Students', studentId));
        setStudents(students.filter(student => student.id !== studentId));
    };

    const handleAssignSubject = async (studentId) => {
        const subjectId = selectedSubjects[studentId];
        if (!subjectId) return;

        const subjectDoc = doc(db, 'Subject', subjectId);
        const subjectSnapshot = await getDoc(subjectDoc);
        if (subjectSnapshot.exists()) {
            const subjectData = subjectSnapshot.data();
            const updatedStudentList = subjectData.student_id_list ? [...subjectData.student_id_list, studentId] : [studentId];
            await updateDoc(subjectDoc, { student_id_list: updatedStudentList });
            alert(`Student assigned to subject: ${subjectId}`);
        } else {
            console.log('No such document!');
        }
    };

    const handleSubjectChange = (studentId, subjectId) => {
        setSelectedSubjects({
            ...selectedSubjects,
            [studentId]: subjectId,
        });
    };

    const handleSubjectInputChange = (e) => {
        const { name, value } = e.target;
        setNewSubject({ ...newSubject, [name]: value });
    };

    const handleAddSubject = async () => {
        const subjectsCollection = collection(db, 'Subject');
        await setDoc(doc(subjectsCollection, newSubject.subject_id), newSubject);
        setSubjects([...subjects, { id: newSubject.subject_id, ...newSubject }]);
        setNewSubject({
            subject_id: '',
            subject_name: '',
            lecture_date: '',
            lecture_start_time: '',
            tutorial_date: '',
            tutorial_start_time: '',
            lecturer_id_list: [''],
            student_id_list: []
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4 text-white">Register New Student:</h1>
            <div className="mb-4">
                <input
                    type="text"
                    name="student_id"
                    placeholder="Student ID"
                    value={newStudent.student_id}
                    onChange={handleInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="student_name"
                    placeholder="Name"
                    value={newStudent.student_name}
                    onChange={handleInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={handleInputChange}
                    className="border p-2 mr-2"
                />
                {editingStudent ? (
                    <button onClick={handleUpdateStudent} className="bg-blue-500 text-white p-2 rounded">Update</button>
                ) : (
                    <button onClick={handleAddStudent} className="bg-green-500 text-white p-2 rounded">Add</button>
                )}
            </div>

            <div className="mb-4">
                <h2 className="text-xl mb-2 text-white">Create New Subject:</h2>
                <input
                    type="text"
                    name="subject_id"
                    placeholder="Subject ID"
                    value={newSubject.subject_id}
                    onChange={handleSubjectInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="subject_name"
                    placeholder="Subject Name"
                    value={newSubject.subject_name}
                    onChange={handleSubjectInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="lecture_date"
                    placeholder="Lecture Date"
                    value={newSubject.lecture_date}
                    onChange={handleSubjectInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="lecture_start_time"
                    placeholder="Lecture Start Time"
                    value={newSubject.lecture_start_time}
                    onChange={handleSubjectInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="tutorial_date"
                    placeholder="Tutorial Date"
                    value={newSubject.tutorial_date}
                    onChange={handleSubjectInputChange}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="tutorial_start_time"
                    placeholder="Tutorial Start Time"
                    value={newSubject.tutorial_start_time}
                    onChange={handleSubjectInputChange}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddSubject} className="bg-green-500 text-white p-2 mt-4 rounded">Add Subject</button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white">
                    <thead>
                    <tr>
                        <th className="w-1/6 px-4 py-2">Student ID</th>
                        <th className="w-1/6 px-4 py-2">Name</th>
                        <th className="w-1/6 px-4 py-2">Email</th>
                        <th className="w-1/6 px-4 py-2">Subject</th>
                        <th className="w-1/6 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="border px-4 py-2">{student.student_id}</td>
                            <td className="border px-4 py-2">{student.student_name}</td>
                            <td className="border px-4 py-2">{student.email}</td>
                            <td className="border px-4 py-2">
                                <select
                                    value={selectedSubjects[student.id] || ''}
                                    onChange={(e) => handleSubjectChange(student.id, e.target.value)}
                                    className="bg-gray-700 text-white p-2 rounded"
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(subject => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.subject_name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleAssignSubject(student.id)}
                                    className="bg-blue-500 text-white p-1 rounded ml-2"
                                >
                                    Assign
                                </button>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleEditStudent(student)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStudents;
