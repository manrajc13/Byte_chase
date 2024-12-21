# Cheat Sheet and Quiz Generator

This repository contains a group project that utilizes the open source Unsloth library's Meta-Llama-3.1-8B-bnb-4bit model for generating a cheat sheet from input pdf as well as generating a quiz of 10 questions from the input pdf and on keywords extracted from it.

## Features
1) Cheat Sheet Generation
   * Extracts text by pdf parsing and ocr for a chapter pdf.
   * Generates a cheat sheet.
2) Keyword Extraction
   * Natural language processing tools such as keybert used for extracting important keywords from      the input pdf text.
3) Quiz Generation
   * Generates 10 (MCQ) questions based on the pdf text and keywords extracted.

  ## Technology Stack
  * Language Model: unsloth/Meta-Llama-3.1-8B-bnb-4bit
  * Libraries: NLTK, PyPDF, unsloth, transformers
  * Frontend: HTML/CSS/JavaScript
