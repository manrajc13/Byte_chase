import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, signOut } from '../utils/auth';
import "./Home.css";
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cheat from './Cheat';

const Home = () => {
    const [file, setFile] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
    const [questions, setQuestions] = useState("");

    // useEffect(() => {
    //     const checkAuthStatus = async () => {
    //         const authStatus = await isAuthenticated();
    //         setLoggedIn(authStatus);
    //         if (!authStatus) navigate("/login");
    //     };
    //     checkAuthStatus();
    // }, [navigate]);

    const handleFileUpload = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (!selectedFile) {
            setUploadError("No file selected.");
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (selectedFile.size > MAX_FILE_SIZE || selectedFile.type !== "application/pdf") {
            setUploadError("Invalid file. Please upload a valid PDF under 5MB.");
            return;
        }

        try {
            setUploading(true);
            setUploadError(null);

            const formData = new FormData();
            formData.append("pdf", selectedFile);

            const { data } = await axios.post('http://localhost:8080/pdf/upload', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            alert(`File uploaded successfully! View it here: ${data.fileUrl}`);

            const backendResponse = await axios.post(
                'https://4a23-35-185-21-162.ngrok-free.app/',
                { fileurl: data.fileUrl }
            );

            console.log("Backend response:", backendResponse);
            // const cheatSheetAsString = JSON.stringify(backendResponse.data.cheat_sheet);

            setResponse(backendResponse.data.cheat_sheet); 
            setQuestions(backendResponse.data.questions);
            
        } catch (error) {
            setUploadError(error.response?.data?.error || "Failed to upload file. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleSignOut = () => {
        signOut();
        setLoggedIn(false);
        navigate("/login");
    };
    if (response.length !== 0) {
        return (
            <Cheat response={response} questions={questions} />
        )
    }
    return (
        <div>
            <Navbar>
                <div className="auth-buttons">
                    {loggedIn ? (
                        <button onClick={handleSignOut} className="auth-button">
                            Sign Out
                        </button>
                    ) : (
                        <button onClick={() => navigate("/login")} className="auth-button">
                            Sign In
                        </button>
                    )}
                </div>
            </Navbar>
            <div className="title">
                <h1 className='l'>Cheat <span>Sheet</span></h1>
                <p className='o'>
                    Your Ultimate Study Companion for College Success

                    Simply upload a chapter PDF, and we’ll generate a detailed cheat sheet tailored to your needs. Along with that, you’ll receive a personalized mock test to help you excel in your upcoming college quizzes.
                </p>
                <input
                    type="file"
                    accept="application/pdf"
                    id="pdf-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <button
                    onClick={() => document.getElementById('pdf-upload').click()}
                    className="upload-button"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload PDF"}
                </button>
                {uploadError && <div className="upload-error">{uploadError}</div>}
            </div>
        </div>
    );
};

export default Home;
