// routes/PdfRouter.js
const express = require('express');
const router = express.Router();
const { uploadPdf, getPdfById } = require('../controllers/pdfController');
const pdfValidation = require('../middlewares/pdfValidation');



router.post('/upload', pdfValidation, uploadPdf);
router.get('/:id', getPdfById);

module.exports = router;
