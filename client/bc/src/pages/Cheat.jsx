import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Cheat.css';
import Navbar from '../components/Navbar';

const Cheat = ({ response, questions }) => {
    const [cheatSheet, setCheatSheet] = useState(''); // State to store cheat sheet text
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        if (response) {
            setCheatSheet(response);
        }
    }, [response]);

    const handleDownload = () => {
        alert('Downloading cheat sheet...');
        const blob = new Blob([cheatSheet], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cheat_sheet.txt';
        link.click();
    };

    const handleTakeQuiz = () => {
        navigate('/quiz', { state: { questions } }); // Navigate to /quiz and pass questions as state
    };

    return (
        <>
            <Navbar />
            <div className="cheat-container">
                <h1 className='k'>Cheat Sheet</h1>
                <div className="cheat-textbox">
                    {cheatSheet || 'Loading cheat sheet...'} {/* Display the cheat sheet or loading message */}
                </div>
                <div className="cheat-buttons">
                    <button className="cheat-button" onClick={handleDownload}>
                        Download Cheat Sheet
                    </button>
                    <button className="cheat-button" onClick={handleTakeQuiz}>
                        Take Quiz
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cheat;

