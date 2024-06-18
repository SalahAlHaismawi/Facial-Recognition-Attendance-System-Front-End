import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // assuming you're using Axios for HTTP requests
import { db, storage } from '@/firebaseConfig';
import {collection, deleteDoc, getDocs, onSnapshot} from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import Student from "@/public/Student.png";
import loadingGif from "@/public/loadingGif.gif";

// @ts-nocheck


const Livestream = ({ link }) => {
    const videoRef = useRef(null);  // Reference to the video element
    const [loading, setLoading] = useState(true);
    const [attendanceList, setAttendanceList] = useState([]);
    const ws = useRef(null); // Reference to the WebSocket instance
    const [isActive, setIsActive] = useState(true); // Track if the video stream is active
    const streamSocket = useRef(null);
    const Socket = useRef(null);
    const encodeSocket = useRef(null);



    useEffect(() => {
        const initWebSocket = () => {
            // @ts-ignore
            Socket.current = new WebSocket(link);

            // @ts-ignore
            Socket.binaryType = 'blob'; // Set binary type to 'blob'

            // @ts-ignore
            Socket.current.onopen = () => {
                console.log('WebSocket Connection Opened');
            };

            // @ts-ignore
            Socket.current.onmessage = (event) => {
                if (videoRef.current) {
                    const url = URL.createObjectURL(event.data);
                    // @ts-ignore
                    videoRef.current.src = url;
                }
                setLoading(false);

            };

            // @ts-ignore
            Socket.current.onclose = () => {
                console.log('WebSocket Connection Closed');
            };

            return Socket;
        };

        // @ts-ignore
        ws.current = initWebSocket();

        return () => {
            // @ts-ignore
            if (ws.current.readyState === WebSocket.OPEN) {
                // @ts-ignore
                ws.current.close();
            }
        };
    }, []);

    const handleCloseWebSocket = () => {
       // @ts-ignore
        ws.current.close();
    };

    // ...
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    // useEffect(() => {
    //     const ws = new WebSocket('ws://localhost:8000/ws/encode');
    //
    //     ws.onmessage = event => {
    //         const data = JSON.parse(event.data);
    //         if (data.progress) {
    //             setProgress(data.progress);
    //             setStatus(data.status);
    //         }
    //     };
    //
    //     ws.onopen = () => console.log("Connected to WebSocket");
    //     ws.onclose = () => console.log("Disconnected from WebSocket");
    //     ws.onerror = error => console.log("WebSocket error:", error);
    //
    //     return () => {
    //         ws.close();
    //     };
    // }, []);

    // const handleButtonClick = async () => {
    //
    //     if (streamSocket.current && streamSocket.current.readyState === WebSocket.OPEN) {
    //         streamSocket.current.close();
    //     }
    //
    //     // Initialize encoding WebSocket
    //     encodeSocket.current = new WebSocket('ws://localhost:8000/ws/encode');
    //     encodeSocket.current.onmessage = (event) => {
    //         console.log("Encoding Data:", event.data);
    //     };
    //     encodeSocket.current.onclose = () => console.log("Encoding WebSocket closed");
    //
    //     // Optionally send a start command
    //     encodeSocket.current.onopen = () => {
    //         encodeSocket.current.send("start encoding");
    //         setIsActive(false); // Update state to indicate encoding is active
    //     };
    //
    //     // Make API call to start encoding
    //     try {
    //         const response = await axios.post('http://localhost:8000/generate-encodings');
    //         console.log('Encoding started:', response.data.message);
    //     } catch (error) {
    //         console.error('Error starting encoding:', error);
    //     }
    // };



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
                        // @ts-ignore
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
        }, 1000); // Delay in milliseconds, e.g., 3000ms = 3 seconds

        return () => clearTimeout(timer);
    }, []);
    const formatTimestamp = (timestamp: any) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour12: false }) + ' ' + date.toLocaleDateString('en-US');
      }


    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl: any) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    if (loading) {
        return <div className={'w-full flex justify-center '}>
            <Image
                src={loadingGif}
                alt="Graduation Cap"

                sizes="100vh"
                className="max-h-[320px] max-w-[400px] pt-3 "
            />
        </div>; // Unified loading indicator
    }


    const clearRecords = async () => {
        try {
            const week1Ref = collection(db, 'Attendance', 'Week1', 'Calculus');
            const querySnapshot = await getDocs(week1Ref);

            const deletePromises = querySnapshot.docs.map((doc) => {
                console.log(`Deleting document with ID: ${doc.id}`); // Log the document ID being deleted
                return deleteDoc(doc.ref);
            });

            await Promise.all(deletePromises);
            console.log("All records cleared successfully");
        } catch (error) {
            console.error("Error clearing records: ", error);
        }
    };


    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className='flex flex-row justify-between mb-10 max-w-[90%] justify-center mx-auto'>
            <div className='w-[60%] justify-between min-w-[60%] '>
                {loading ? (
                    <div className="flex items-center justify-center h-[300px]">
                        <Image
                            src={loadingGif}
                            alt="Graduation Cap"

                            sizes="100vh"
                            className="max-h-[320px] max-w-[400px] pt-3 "
                        />                    </div>
                ) : (
                <img ref={videoRef} alt="Video Stream" className='rounded-lg border-8 border-[#6707FF] '/>
                )}
                {/* Uncomment and use the button if needed */}
                {/* <button onClick={handleButtonClick}>Generate Encodings</button> */}
                {/*<div className='flex justify-between'>*/}
                {/*    <button onClick={handleButtonClick} className='bg-[#6707FF] text-white rounded-lg p-2 mt-2 transition duration-300 transform hover:scale-150'>Generate*/}
                {/*        Encodings*/}
                {/*    </button>*/}
                {/*    <div>*/}
                {/*        <h1>Encoding Progress</h1>*/}
                {/*        <progress value={progress} max="100">{progress}%</progress>*/}
                {/*        <p>{progress}% - {status}</p>*/}
                {/*    </div>*/}
                {/*    <button onClick={clearRecords} className='bg-[#f44336] text-white rounded-lg p-2 mt-2 transition duration-300 transform hover:scale-150'>*/}
                {/*        Clear Records*/}
                {/*    </button>*/}
                {/*</div>*/}


            </div>


            <div
                className='w-[40%] ml-5 overflow-auto bg-gradient-to-r from-purple-700 to-indigo-600 rounded-xl p-5'> {/* Adjusted for side-by-side layout */}
                <h1 className='text-white text-xl ml-1 pb-3'>Attendance List: </h1>
                <div
                    className='grid grid-cols-3 lg:grid-cols-2 gap-4  '> {/* Changed to 1 column grid within the smaller container */}
                    {attendanceList.length > 0 ? (
                        attendanceList.map((attendance: {
                            studentId: string;
                            studentName: string;
                            imageUrl: string;
                            timeStamp(time:any): String
                        }) => (
                            <div
                                className='w-auto bg-[#9F81CB]  to-[#5838DC] shadow-lg text-white rounded-lg p-2 font-thin text-sm transition duration-300 transform hover:scale-105 hover:shadow-xl shadow-sm'
                                key={attendance.studentId}>
                                <div onClick={() => handleImageClick(attendance.imageUrl)}>
                                    <h3 className='pl-1 pb-1 text-sm'>{attendance.studentName}</h3>
                                    <h3 className='pl-1 pb-1 text-sm'>{attendance.studentId}</h3>

                                    <Image
                                        src={attendance.imageUrl}
                                        alt="Student"
                                        width={200} // These might need adjusting depending on actual container size
                                        height={200}
                                        layout='responsive'
                                        className='p-1 rounded-xl'
                                    />
                                </div>
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

export default Livestream;
