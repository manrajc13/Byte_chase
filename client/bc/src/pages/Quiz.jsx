import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Quiz.css";

const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const questionsProp = location.state?.questions;

    const initialTime = 600; // 10 minutes

    const [questionsState, setQuestionsState] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timer, setTimer] = useState(initialTime);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    // Fetch questions data
    useEffect(() => {
        if (Array.isArray(questionsProp) && questionsProp.length > 0) {
            setQuestionsState(questionsProp);
        } else {
            console.error("Invalid or empty questions data", questionsProp);
        }
    }, [questionsProp]);

    // Format questions
    const formattedQuestions = useMemo(() => {
        return questionsState?.map((q) => ({
            question: q.ques || '',
            options: { a: q.a, b: q.b, c: q.c, d: q.d },
            correctAnswer: q.ans || '',
        })) || [];
    }, [questionsState]);

    // Initialize userAnswers when formattedQuestions is ready
    useEffect(() => {
        if (formattedQuestions.length > 0) {
            const initialAnswers = formattedQuestions.map(() => ({
                answer: '',
                isCorrect: false,
            }));
            setUserAnswers(initialAnswers);
        }
    }, [formattedQuestions]);

    // Timer functionality
    useEffect(() => {
        if (timer <= 0) {
            handleSubmit();
            return;
        }

        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    
    const handleAnswerChange = (index, option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[index] = {
            answer: option,
            isCorrect: option === formattedQuestions[index].correctAnswer,
        };
        setUserAnswers(updatedAnswers);

        
        setCorrectAnswers(updatedAnswers.filter((a) => a.isCorrect).length);
    };

    const handleSubmit = () => {
        const quizData = formattedQuestions.map((q, index) => ({
            ...q,
            answer: userAnswers[index]?.answer || '',
        }));

        // Save data to localStorage
        localStorage.setItem('quiz-questions', JSON.stringify(quizData));

        // Navigate to review page
        navigate('/review');
    };

    // Format time for the timer display
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const getButtonClass = (index) => {
        const isActive = currentQuestion === index ? 'active' : '';
        const isAnswered = userAnswers[index]?.answer ? 'answered' : '';
        return `${isActive} ${isAnswered}`;
    };

    return (
        <div className="quiz-container">
            <div className="quiz-timer" aria-live="polite">
                <h3>Time Remaining: {formatTime(timer)}</h3>
            </div>
            <div className="quiz-content">
                <div className="quiz-question">
                    {formattedQuestions.length > 0 ? (
                        <>
                            <h2>Question {currentQuestion + 1}: {formattedQuestions[currentQuestion].question}</h2>
                            <div className="quiz-options">
                                {Object.entries(formattedQuestions[currentQuestion].options).map(([key, option]) => (
                                    <label key={key} className="quiz-option">
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion}`}
                                            value={key}
                                            checked={userAnswers[currentQuestion]?.answer === key}
                                            onChange={() => handleAnswerChange(currentQuestion, key)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Loading questions...</p>
                    )}
                </div>
                <div className="quiz-navigation">
                    <h3 className='m'>Questions</h3>
                    <div className="question-numbers">
                        {formattedQuestions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentQuestion(index)}
                                className={getButtonClass(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="quiz-submit">
                <button
                    onClick={handleSubmit}
                    disabled={userAnswers.some((a) => !a.answer) || timer <= 0}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Quiz;
