import React from 'react';
import Layout from './layout'; // Fixed import statement

const Page = () => {
    return (
        <Layout>
            <h1>Success!</h1>
            <p>Your operation was successful.</p>
            <p>Success</p> {/* Added line */}
        </Layout>
    );
};

export default Page;