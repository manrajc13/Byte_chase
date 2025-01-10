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

    // Circle chart configuration
    const radius = 90;
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const strokeDasharray = `${(correctPercentage / 100) * circumference} ${circumference}`; // Stroke length based on percentage
    const strokeDashoffset = circumference - (correctPercentage / 100) * circumference; // Offset to start the stroke from the top

    const handleGoHome = () => {
        // Clear answers from localStorage when navigating to home
        localStorage.removeItem('quiz-questions');
        // Navigate to home
        navigate('/');
    };

    return (
        <div className="review-container">
            <h1>Quiz Review</h1>
            <h2>Total Marks: {totalMarks} / {totalQuestions}</h2>

            {/* Circle chart */}
            <div className="circle-chart-container">
                <svg className="circle-chart" width="200" height="200" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                        className="circle-background"
                        cx="100"
                        cy="100"
                        r={radius}
                        stroke="#ddd"
                        strokeWidth="20"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        className="circle-progress"
                        cx="100"
                        cy="100"
                        r={radius}
                        stroke="#4CAF50" // Correct answers color
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                    />
                    {/* Text to show percentage */}
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
                                {question.answer || "Not Answered"}
                            </span>
                        </p>
                        <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                    </div>
                ))}
            </div>

            <button className="review-button" onClick={handleGoHome}>Go to Home</button>
        </div>
    );
};

export default Review;

