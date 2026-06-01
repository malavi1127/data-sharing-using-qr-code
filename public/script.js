// Drag and drop area
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const uploadMessage = document.getElementById('uploadMessage');
const qrCodeContainer = document.getElementById('qrCodeContainer');

// Handle drag-and-drop functionality
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#2980b9';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#3498db';
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = '#3498db';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files; // Assign files to input
        dropArea.textContent = `Selected file: ${files[0].name}`;
    }
});

// Open file dialog when drop area is clicked
dropArea.addEventListener('click', () => fileInput.click());

// Update drop area text when file is selected manually
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        dropArea.textContent = `Selected file: ${files[0].name}`;
    }
});

// Handle file upload and QR code generation
uploadButton.addEventListener('click', () => {
    const securityKey = document.getElementById('securityKey').value;
    const files = fileInput.files;

    if (!files.length) {
        uploadMessage.textContent = 'Please select a file!';
        uploadMessage.style.color = 'red';
        return;
    }

    if (!securityKey) {
        uploadMessage.textContent = 'Please enter the security key!';
        uploadMessage.style.color = 'red';
        return;
    }

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            uploadMessage.textContent = `Upload successful: ${data.fileName}`;
            uploadMessage.style.color = 'green';

            // Generate QR code
            generateQRCode(data.fileName, securityKey);
        })
        .catch(err => {
            uploadMessage.textContent = 'Upload failed!';
            uploadMessage.style.color = 'red';
            console.error(err);
        });
});





// Generate QR Code
function generateQRCode(fileName, securityKey) {
    qrCodeContainer.innerHTML = ''; // Clear previous QR code

    const serverAddress = 'http://192.168.0.3:5500';
    const downloadURL = `https://manohardorreti.github.io/manohardorreti.github-io/download.html?file=${encodeURIComponent(fileName)}&key=${encodeURIComponent(securityKey)}`;
    new QRCode(qrCodeContainer, {
        text: downloadURL,
        width: 150,
        height: 150,
    });
}