const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for handling file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', fileName: req.file.originalname });
});

// Start the server
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running at http://192.168.0.3:${PORT}`);
});
