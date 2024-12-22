// controllers/pdfController.js
const Pdf = require('../models/pdf');

exports.uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded or invalid file type' });
        }

        const pdf = new Pdf({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
        });

        const savedPdf = await pdf.save();

        res.status(200).json({
            message: 'PDF uploaded successfully',
            pdfId: savedPdf._id,
        });
    } catch (error) {
        console.error('Error uploading PDF:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPdfById = async (req, res) => {
    try {
        const pdf = await Pdf.findById(req.params.id);

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        res.status(200).json({
            fileName: pdf.fileName,
            filePath: pdf.filePath,
            fileSize: pdf.fileSize,
            uploadedAt: pdf.uploadedAt,
        });
    } catch (error) {
        console.error('Error retrieving PDF:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
