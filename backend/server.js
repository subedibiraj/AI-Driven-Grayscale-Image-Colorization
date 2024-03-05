const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

// CORS middleware to allow requests from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.static(path.join(__dirname, 'processed')));

// Define endpoint to serve the image file
app.get('/image', async (req, res) => {
    const imagePath = path.join(__dirname, 'processed', 'colored_gray.jpg');

    const checkImage = () => {
        return new Promise((resolve, reject) => {
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    resolve(true); // Image exists
                } else {
                    reject(false); // Image does not exist
                }
            });
        });
    };

    try {
        // Check if the image exists
        await checkImage();

        // If the image exists, send it
        res.sendFile(imagePath);
    } catch (error) {
        // If the image does not exist, wait and try again after a delay
        setTimeout(() => {
            res.redirect('/image');
        }, 5000); // Wait for 5 seconds before trying again
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destination1 = 'uploads/';  // First destination

        // Call the callback with the first destination
        cb(null, destination1);
    },
    filename: function (req, file, cb) {
        // Set the filename to "gray.jpg"
        cb(null, 'gray.jpg');
    }
});

const upload = multer({ storage: storage });

// Use the fileFilter event to copy or move the file to the second destination
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const sourcePath = path.join('uploads', 'gray.jpg');
    const destinationPath = path.join('C:/MINOR PROJECT ONLY/Final Model ( Last )/frontend/src/uploads', 'gray.jpg');

    // Create a read stream from the source file
    const fileStream = fs.createReadStream(sourcePath);

    // Create a write stream to the destination file
    const writeStream = fs.createWriteStream(destinationPath);

    // Pipe the data from the source stream to the destination stream
    fileStream.pipe(writeStream);

    // Set a callback to be called once the copying is finished
    writeStream.on('finish', () => {
        console.log('File copied successfully');
        res.json({ message: 'File uploaded and copied successfully' });
    });
});


app.post('/load-model', (req, res) => {
    const venvPythonPath = path.join(__dirname, 'scripts', 'myenv', 'Scripts', 'python.exe');

    // Construct the absolute path to the Python script
    const pythonScriptPath = path.join(__dirname, 'scripts', 'process_image.py');

    // Construct the command string to execute the Python script within the virtual environment
    const command = `"${venvPythonPath}" "${pythonScriptPath}"`;

    // Spawn a child process to execute the command
    const pythonProcess = spawn(command, [], { shell: true });

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            // Python script executed successfully
            console.log('Python script executed successfully');
            res.status(200).send('Model loaded successfully');
        } else {
            // Python script encountered an error
            console.error('Error executing Python script');
            res.status(500).send('Error loading model');
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
