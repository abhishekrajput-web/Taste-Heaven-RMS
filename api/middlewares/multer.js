import multer from 'multer';

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
