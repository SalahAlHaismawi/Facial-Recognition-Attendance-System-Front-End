import React from 'react';
import useProtectedRoute from './useProtectedRoute'; // Adjust the path as needed

const ProtectedPage = () => {
    useProtectedRoute(); // Ensures protection

    // The content below will only be rendered if the user is logged in
    return (
        <div>
            <h1>Protected Content</h1>
            <p>This content is only accessible to logged-in users.</p>
        </div>
    );
};

export default ProtectedPage;
