import React from 'react'
import { FileText, HelpCircle, Zap, BookOpen } from 'lucide-react';
import './AboutUs.css';
import Navbar from '../components/Navbar';
const teamMembers = [
    {
      name: 'Jane Doe',
      role: 'Founder & CEO',
      image: '/placeholder.svg?height=200&width=200',
      description: 'Jane is the visionary behind our platform, with 10+ years of experience in EdTech.',
    },
    {
      name: 'John Smith',
      role: 'Lead Developer',
      image: '/placeholder.svg?height=200&width=200',
      description: 'John is our technical genius, ensuring our platform runs smoothly and efficiently.',
    },
    {
      name: 'Emily Brown',
      role: 'Content Strategist',
      image: '/placeholder.svg?height=200&width=200',
      description: 'Emily curates and creates high-quality content for our cheat sheets and quizzes.',
    },
    {
      name: 'Michael Lee',
      role: 'UX Designer',
      image: '/placeholder.svg?height=200&width=200',
      description: 'Michael is responsible for creating an intuitive and engaging user experience.',
    },
  ];
const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="about-us-container">
      <h1>About Us</h1>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>At CheatSheetQuiz, we're dedicated to revolutionizing the way you learn and retain information. Our platform combines the power of customized cheat sheets with interactive quizzes to create an engaging and effective learning experience.</p>
      </section>
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <FileText size={36} />
            <h3>Cheat Sheet Generation</h3>
            <p>Create concise, visually appealing cheat sheets tailored to your specific needs. Our AI-powered system helps you summarize complex topics into easy-to-digest formats.</p>
          </div>
          <div className="service-item">
            <HelpCircle size={36} />
            <h3>Interactive Quizzes</h3>
            <p>Test your knowledge with our adaptive quizzes. Our system adjusts question difficulty based on your performance, ensuring you're always challenged and learning.</p>
          </div>
          <div className="service-item">
            <Zap size={36} />
            <h3>Personalized Learning Paths</h3>
            <p>Our algorithm analyzes your strengths and weaknesses to create customized learning paths, helping you focus on areas that need improvement.</p>
          </div>
          <div className="service-item">
            <BookOpen size={36} />
            <h3>Comprehensive Study Resources</h3>
            <p>Access a vast library of study materials, including video tutorials, practice problems, and in-depth articles to supplement your learning journey.</p>
          </div>
        </div>
      </section>
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="description">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>  
    </>
  )
}

export default AboutUs
