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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/video');

        ws.binaryType = 'blob';  // Important: Set binary type to 'blob'

        ws.onmessage = (event) => {
            if (videoRef.current) {
                const url = URL.createObjectURL(event.data);
                (videoRef.current as HTMLImageElement).src = url;
            }
            setLoading(false);
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

    useEffect(() => {
        // Set a timeout to simulate a delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 6000); // Delay in milliseconds, e.g., 3000ms = 3 seconds

        return () => clearTimeout(timer);
    }, []);
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour12: false }) + ' ' + date.toLocaleDateString('en-US');
      }
    const handleButtonClick = () => {
        // Call the API or perform some action
        axios.post('http://localhost:8000/generate-encodings', {
            // Your data here
        })
            .then(response => {
                console.log('Success:', response.data.message);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data.error : error.message);
            })
            .finally(() => {
                // Reload the page after API call completion, regardless of success or error
                window.location.reload();
            });
    };
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    if (loading) {
        return <div>Loading...</div>; // Unified loading indicator
    }
    return (
        <div className='flex flex-row justify-between'>
            <div className='w-[60%] justify-between'>
                {loading ? (
                    <div className="flex items-center justify-center h-[300px]">Loading...</div>
                ) : (
                <img ref={videoRef} alt="Video Stream" className='rounded-lg border-8 border-[#6707FF] '/>
                )}
                {/* Uncomment and use the button if needed */}
                {/* <button onClick={handleButtonClick}>Generate Encodings</button> */}
                <div className='flex justify-between'>
                    <button onClick={handleButtonClick} className='bg-[#6707FF] text-white rounded-lg p-2 mt-2 transition duration-300 transform hover:scale-150'>Generate
                        Encodings
                    </button>
                    <button onClick={handleButtonClick} className='bg-[#f44336] text-white rounded-lg p-2 mt-2 transition duration-300 transform hover:scale-150'>
                        Clear Records
                    </button>
                </div>


            </div>


            <div
                className='w-[40%] ml-5 overflow-auto bg-gradient-to-r from-purple-700 to-indigo-600 rounded-xl p-5'> {/* Adjusted for side-by-side layout */}
                <h1 className='text-white text-xl ml-1 pb-3'>Attendance List: </h1>
                <div
                    className='grid grid-cols-3 gap-4  '> {/* Changed to 1 column grid within the smaller container */}
                    {attendanceList.length > 0 ? (
                        attendanceList.map((attendance: {
                            studentId: string;
                            studentName: string;
                            imageUrl: string;
                            timeStamp: String
                        }) => (
                            <div
                                className='bg-[#D007A5]  to-[#b01dddcc] shadow-lg text-white rounded-lg p-2 font-thin text-sm transition duration-300 transform hover:scale-105 hover:shadow-xl shadow-sm'
                                key={attendance.studentId}>
                                <h3 className='pl-1 pb-1 '>{attendance.studentName}</h3>
                                <div onClick={() => handleImageClick(attendance.imageUrl)}>
                                    <Image
                                        src={attendance.imageUrl}
                                        alt="Student"
                                        width={200} // These might need adjusting depending on actual container size
                                        height={200}
                                        layout='responsive'
                                        className='p-1 rounded-xl'
                                    />
                                </div>
                                <p className='mt-1'>Student_ID: {attendance.studentId}</p>
                                <p className='mt-1'>Time: {formatTimestamp(attendance.time)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No attendance data found.</p>
                    )}

                </div>

            </div>
        </div>

    );
};

export default VideoStream;
