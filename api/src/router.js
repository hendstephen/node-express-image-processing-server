const { Router } = require('express');
const multer = require('multer');

const router = Router();
const storage = multer.diskStorage({
    destination: 'api/uploads/',
    filename: filename,
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/upload', upload.single('photo'), (request, response) => {
    if (request.fileValidationError) {
        response.status(400).json({ error: request.fileValidationError });
    } else {
        response.status(201).json({ success: true });
    }
});

function filename(request, file, callback) {
    callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
    if (file.mimetype !== 'image/png') {
        const msg = 'Wrong file type';
        request.fileValidationError = msg;
        callback(null, false, new Error(msg));
    } else {
        callback(null, true);
    }
}

module.exports = router;