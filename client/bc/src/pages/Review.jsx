import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiHome, FiCheck, FiX } from 'react-icons/fi';
import "./Review.css";

const Review = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [totalMarks, setTotalMarks] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [correctPercentage, setCorrectPercentage] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(0);

    useEffect(() => {
        const savedQuestions = localStorage.getItem('quiz-questions');
        if (savedQuestions) {
            const parsedQuestions = JSON.parse(savedQuestions);
            setQuestions(parsedQuestions);
            setTotalQuestions(parsedQuestions.length);
            const correct = parsedQuestions.filter(q => q.answer === q.correctAnswer).length;
            setTotalMarks(correct);
            setCorrectPercentage((correct / parsedQuestions.length) * 100);
        }
    }, []);

    const handleGoHome = () => {
        localStorage.removeItem('quiz-questions');
        navigate('/');
    };

    const nextQuestion = () => {
        setActiveQuestion((prev) => (prev + 1) % totalQuestions);
    };

    const prevQuestion = () => {
        setActiveQuestion((prev) => (prev - 1 + totalQuestions) % totalQuestions);
    };

    return (
        <div className="review-container">
            <motion.div
                className="review-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Quiz Review</h1>
                <div className="score-container">
                <div className="circular-progress">
                        <CircularProgressbar
                            value={correctPercentage}
                            text={`${Math.round(correctPercentage)}%`}
                            styles={buildStyles({
                                textColor: "#000",
                                pathColor: "#000",
                                trailColor: "#d6d6d6"
                            })}
                        />
                    </div>
                    <div className="score-details">
                        <p className="total-score">{totalMarks} / {totalQuestions}</p>
                        <p className="score-label">Correct Answers</p>
                    </div>
                </div>
                <div className="questions-navigation">
                    <button onClick={prevQuestion} className="nav-button">&lt;</button>
                    <span>{activeQuestion + 1} / {totalQuestions}</span>
                    <button onClick={nextQuestion} className="nav-button">&gt;</button>
                </div>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="question-card"
                    >
                        {questions[activeQuestion] && (
                            <>
                                <h3>Question {activeQuestion + 1}</h3>
                                <p className="question-text">{questions[activeQuestion].question}</p>
                                <div className="answer-container">
                                    <div className="answer-box">
                                        <p className="answer-label">Your Answer:</p>
                                        <p className={`answer ${questions[activeQuestion].answer === questions[activeQuestion].correctAnswer ? 'correct' : 'wrong'}`}>
                                            {questions[activeQuestion].answerText || "Not Answered"}
                                            {questions[activeQuestion].answer === questions[activeQuestion].correctAnswer ? 
                                                <FiCheck className="answer-icon" /> : 
                                                <FiX className="answer-icon" />
                                            }
                                        </p>
                                    </div>
                                    <div className="answer-box">
                                        <p className="answer-label">Correct Answer:</p>
                                        <p className="answer correct">
                                            {questions[activeQuestion].correctAnswerText}
                                            <FiCheck className="answer-icon" />
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
                <button className="review-button" onClick={handleGoHome}>
                    <FiHome className="button-icon" />
                    Go to Home
                </button>
            </motion.div>
        </div>
    );
};

export default Review;
