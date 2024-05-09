import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // assuming you're using Axios for HTTP requests
import { db, storage } from '@/firebaseConfig';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';



const ImageModal = ({ isOpen, onClick, imageUrl }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={onClick}>
        <img src={imageUrl} alt="Expanded View" className="max-w-full max-h-full" />
      </div>
    );
  };

const VideoStream = () => {
    const videoRef = useRef(null);  // Reference to the video element

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/video');

        ws.binaryType = 'blob';  // Important: Set binary type to 'blob'

        ws.onmessage = (event) => {
            if (videoRef.current) {
                const url = URL.createObjectURL(event.data);
                (videoRef.current as HTMLImageElement).src = url;
            }
        };

        ws.onclose = () => {
            console.log('WebSocket Connection Closed');
        };

        return () => {
            ws.close();
        };
    }, []);
    const [attendance, setAttendance] = useState(null);
    const documentId = '1201303035'; // Document ID for specific attendance record


    // ...

    const [attendanceList, setAttendanceList] = useState([]);

    useEffect(() => {
        const fetchCalculusAttendance = () => {
            const calculusRef = collection(db, 'Attendance', 'Week1', 'Calculus');
            
            const unsubscribe = onSnapshot(calculusRef, (querySnapshot) => {
                const promises = querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    console.log("Document data:", data);  // Log individual document data
    
                    const imageRef = ref(storage, data.image_url);
                    const imageUrl = await getDownloadURL(imageRef);
                    console.log("Image URL:", imageUrl);  // Log URL for each image
    
                    return {
                        studentId: data.student_name,  // Assuming this is the numeric ID
                        studentName: data.student_id,  // Assuming this is the name
                        imageUrl: imageUrl,
                        time: data.time  // If you also need to display the time
                    };
                });
    
                Promise.all(promises)
                    .then(fetchedAttendanceList => {
                        console.log("Attendance List:", fetchedAttendanceList);  // Log the complete list of fetched data
                        setAttendanceList(fetchedAttendanceList);
                    })
                    .catch(error => {
                        console.error("Error processing documents: ", error);
                    });
            }, error => {
                console.error("Error listening to documents: ", error);
            });
    
            return unsubscribe; // Return the unsubscribe function to clean up the subscription
        };
    
        const unsubscribe = fetchCalculusAttendance(); // Initialize listener and get unsubscribe function
    
        return () => {
            unsubscribe(); // Cleanup subscription on component unmount
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount
    
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour12: false }) + ' ' + date.toLocaleDateString('en-US');
      }
    const handleButtonClick = () => {
        const studentIds = ['1201303035']; // Define the student IDs to be sent

        axios.post('http://localhost:8000/generate-encodings', {
            student_ids: studentIds
        })
        .then(response => {
            console.log('Success:', response.data.message);
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data.error : error.message);
        });
    };
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    return (
        <div className='flex flex-col'>
                <div className='w-[60%] ml-5'>
            
            <img ref={videoRef} alt="Video Stream" className='border-2 border-Lpurple'/>
            {/* <button  onClick={handleButtonClick}>Generate Encodings</button> */}

                        <div className='grid grid-cols-4 gap-4 mt-10'>
                           
                            {attendanceList.length > 0 ? (
                                attendanceList.map((attendance: { studentId: string; studentName: string; imageUrl: string; timeStamp: String }) => (
                                    <div className='w-[250px] bg-Lpurple border-1 shadow-lg text-white rounded-lg p-2 font-thin text-sm transition duration-300 transform hover:scale-105 hover:shadow-xl shadow-sm' key={attendance.studentId}>
                                        <h3>{attendance.studentName}</h3>
                                        <div onClick={() => handleImageClick(attendance.imageUrl)}>
                                <Image
                                    src={attendance.imageUrl}
                                    alt="Student"
                                    width={200}
                                    height={200}
                                    layout='responsive'
                                    className='border rounded-lg border-Lpurple shadow-lg p-1'
                                />
                            </div>
                                        <p className=' '>Student_ID: {attendance.studentId}</p>
                                        <p>Time Stamp: {formatTimestamp(attendance.time)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No attendance data found.</p>
                            )}
                        </div>
      
   
        </div>
          <div.
        </div>
        
    );
};

export default VideoStream;
