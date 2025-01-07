# Cheat Sheet and Quiz Generator

This repository contains a group project that utilizes the open source Unsloth library's Meta-Llama-3.1-8B-bnb-4bit model for generating a cheat sheet from input pdf as well as generating a quiz of 10 multiple choice questions from the input pdf and on keywords extracted from it.

## Features
1) Cheat Sheet Generation
   * Extracts text by pdf parsing and ocr for a chapter pdf.
   * Generates a cheat sheet.
2) Keyword Extraction
   * Natural language processing tools such as keybert used for extracting important keywords from      the input pdf text.
3) Quiz Generation
   * Generates 10 (MCQ) questions based on the pdf text and keywords extracted(one of the keywords is taken as the right answer) and also use certain keywords as the wrong options for the question. 

  ## Technology Stack
  * Language Model: unsloth/Meta-Llama-3.1-8B-bnb-4bit
  * Languages : HTML, CSS, Javascript, Python
  * Libraries: NLTK, PyPDF, unsloth, transformers, paddleocr, keybert
  * Frontend: HTML/CSS/JavaScript/React
  * Backend: Express.js, Node.js, cors, dotenv, jsonwebtoken, bycrypt, moongose, mongodb, joi, flask
