import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Review.css";

const Review = () => {
    const navigate = useNavigate();

    // Retrieve questions from localStorage
    const savedQuestions = localStorage.getItem('quiz-questions');
    const questions = savedQuestions ? JSON.parse(savedQuestions) : [];

    // Calculate total correct answers
    const totalMarks = questions.filter(q => q.answer === q.correctAnswer).length;
    const totalQuestions = questions.length;
    const correctPercentage = (totalMarks / totalQuestions) * 100;

    const handleGoHome = () => {
        localStorage.removeItem('quiz-questions');
        navigate('/');
    };

    return (
        <div className="review-container">
            <h1>Quiz Review</h1>
            <h2>Total Marks: {totalMarks} / {totalQuestions}</h2>

            <div className="circle-chart-container">
                <svg className="circle-chart" width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" stroke="#ddd" strokeWidth="20" fill="none" />
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        stroke="#4CAF50"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${(correctPercentage / 100) * (2 * Math.PI * 90)} ${2 * Math.PI * 90}`}
                        strokeDashoffset={(1 - correctPercentage / 100) * (2 * Math.PI * 90)}
                    />
                    <text x="50%" y="50%" textAnchor="middle" dy="7px" fontSize="24" fill="#333">
                        {Math.round(correctPercentage)}%
                    </text>
                </svg>
            </div>

            <div className="review-questions">
                {questions.map((question, index) => (
                    <div key={index} className="review-question">
                        <h3>Question {index + 1}: {question.question}</h3>
                        <p>
                            <strong>Your Answer:</strong> 
                            <span className={question.answer === question.correctAnswer ? 'correct' : 'wrong'}>
                                {question.answerText || "Not Answered"}
                            </span>
                        </p>
                        <p><strong>Correct Answer:</strong> {question.correctAnswerText}</p>
                    </div>
                ))}
            </div>

            <button className="review-button" onClick={handleGoHome}>Go to Home</button>
        </div>
    );
};

export default Review;
