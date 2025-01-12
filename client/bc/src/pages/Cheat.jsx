import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style you like
import './Cheat.css';
import Navbar from '../components/Navbar';

const Cheat = ({ response, questions }) => {
    const [cheatSheet, setCheatSheet] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (response) {
            setCheatSheet(response);
        }
    }, [response]);

    const handleDownload = () => {
        const blob = new Blob([cheatSheet], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'cheat_sheet.txt';
        link.click();
    };

    const handleTakeQuiz = () => {
        navigate('/quiz', { state: { questions } });
    };

    return (
        <>
            <Navbar />
            <div className="cheat-container">
                <h1 className='k'>Cheat Sheet</h1>
                <div className="cheat-textbox">
                    {cheatSheet ? (
                        <SyntaxHighlighter language="plaintext" style={dracula}>
                            {cheatSheet}
                        </SyntaxHighlighter>
                    ) : (
                        'Loading cheat sheet...'
                    )}
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
