import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import the helper function
import "./Home.css";
import Navbar from '../components/Navbar';

const Home = () => {
    const [file, setFile] = useState(null); 
    const navigate = useNavigate();

    const handleFileUpload = async (event) => {
        // Check if the user is authenticated
        const authStatus = await isAuthenticated();
        if (!authStatus) {
            alert("Please sign in first.");
            navigate("/login"); // Redirect to login page
            return;
        }
    
        const selectedFile = event.target.files[0];
        
        // Check if the selected file is a PDF
        if (selectedFile && selectedFile.type === "application/pdf") {
            
            // Check file size (5MB limit)
            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
            if (selectedFile.size > MAX_FILE_SIZE) {
                alert("File is too large. Maximum size is 5MB.");
                return;
            }
    
            setFile(selectedFile); 
            console.log("PDF selected:", selectedFile.name);
    
            const formData = new FormData();
            formData.append("pdf", selectedFile);
    
            try {
                const response = await fetch("http://localhost:8080/pdf/upload", {
                    method: "POST",
                    body: formData,
                });
    
                if (response.ok) {
                    const result = await response.json();
                    alert("File uploaded successfully! File ID: " + result.pdfId);
                    navigate("/cheat"); // Navigate to the "/cheat" page on success
                } else {
                    const errorMessage = await response.text();
                    console.error("Upload failed:", errorMessage);
                    alert("Failed to upload file.");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Error uploading file. Please try again.");
            }
        } else {
            alert("Please select a PDF file.");
        }
    };
    

    return (
        <div>
            <Navbar />
            <div className="title">
                <h1>Cheat <span>Sheet</span></h1>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate doloremque 
                    ratione fugit maxime dolorum eveniet, molestiae ullam asperiores minima incidunt 
                    aliquid. Aut repudiandae cum asperiores nostrum praesentium, ipsam perferendis 
                    eaque ipsum dolorem commodi aperiam exercitationem molestiae quia dolore eveniet 
                    distinctio obcaecati libero. Eos repudiandae, omnis quae non necessitatibus voluptate sed.
                </div>
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
                >
                    Upload PDF
                </button>
            </div>
        </div>
    );
};

export default Home;
