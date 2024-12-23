import React from 'react';
import Navbar from '../components/Navbar';
import './contact.css'; // Adjust the path according to your project structure

const ContactUs = () => {
    return (
        <div>
            <header>
                <div className="logo">
                    <h2>bc</h2>
                </div>
                <nav>
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Services</a>
                </nav>
                <div>
                    <button style={{ marginRight: '10px' }}>Sign Up</button>
                    <button>Sign In</button>
                </div>
            </header>

            <div className="container">
                <h1>Contact Us</h1>
                <p>Have any questions or suggestions? Feel free to reach out to us!</p>
                <form action="#" method="post">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea rows="5" placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>

            <footer>
                <p>&copy; 2024 Bc. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default ContactUs;
