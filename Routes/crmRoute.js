const express = require('express');
const multer = require('multer');
const crmController = require('../Controllers/crmController');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/settings', crmController.getCRMSettings);
router.post('/updateSettings', crmController.updateCRMSettings);
router.post('/uploadImage', upload.single('image'), crmController.uploadImage);

module.exports = router;
