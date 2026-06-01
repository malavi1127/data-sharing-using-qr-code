// Get query parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const fileName = urlParams.get('file');
const securityKey = urlParams.get('key');

// Display the file name
document.getElementById('fileName').textContent = `File: ${fileName}`;

const downloadButton = document.getElementById('downloadButton');
const downloadMessage = document.getElementById('downloadMessage');

downloadButton.addEventListener('click', () => {
    const enteredKey = document.getElementById('securityKeyInput').value;

    if (enteredKey === securityKey) {
        // Security key matches, proceed with download
        const fileURL = `http://192.168.0.6:5500/test/download?file=${encodeURIComponent(fileName)}&key=${encodeURIComponent(enteredKey)}`;
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName; // This may not be necessary since the server handles the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        downloadMessage.textContent = 'File download initiated!';
        downloadMessage.style.color = 'green';
    } else {
        // Security key does not match
        downloadMessage.textContent = 'Invalid security key!';
        downloadMessage.style.color = 'red';
    }
});

