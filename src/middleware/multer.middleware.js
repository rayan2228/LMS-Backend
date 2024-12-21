import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create a directory if it doesn't exist
// const uploadDirectory = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory, { recursive: true });
// }

// Set up multer storage
const storage = multer.diskStorage({
    // Define the destination directory for uploads
    destination: function (req, file, cb) {
        cb(null, "public/temp/"); 
    },
    // Define the filename to be used for uploaded files
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Sanitize the filename (optional step)
        const sanitizedFileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, sanitizedFileName);
    }
});

// Define allowed file types (you can modify this based on your needs)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Example MIME types
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type'), false); // Reject file
    }
};

// Create multer instance with storage and file filter
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Optional: limit file size to 10MB
});



