import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PreEnrollmentPage from './components/PreEnrollmentPage';
import PreEnrollmentForm from './components/PreEnrollmentForm';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Header />
                <Routes>
                    {/* Landing page */}
                    <Route path="/" element={<PreEnrollmentPage />} />

                    {/* Pre-enrollment form page */}
                    <Route path="/join" element={<PreEnrollmentForm />} />

                    {/* Thank you page after successful enrollment */}
                    <Route path="/thank-you" element={
                        <div className="min-h-screen bg-gradient-primary text-white flex items-center justify-center">
                            <div className="text-center p-8">
                                <h1 className="text-3xl font-bold mb-4">Thank You for Pre-Enrolling!</h1>
                                <p className="text-lg text-gray-300">
                                    We've received your information and will be in touch shortly.
                                </p>
                            </div>
                        </div>
                    } />

                    {/* Catch all route for 404 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
