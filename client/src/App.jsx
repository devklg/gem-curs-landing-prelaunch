import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PreEnrollmentForm from './components/PreEnrollmentForm';
import ThankYou from './components/PreEnrollment/ThankYou';
import Welcome from './components/Onboarding/Welcome';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<PreEnrollmentForm />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/welcome" element={<Welcome />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
