import React from 'react';
import Navbar from '../components/Navbar';
import './contact.css'; // Adjust the path according to your project structure

const ContactUs = () => {
    return (
        <div>
            
            <Navbar></Navbar>
            
            

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
