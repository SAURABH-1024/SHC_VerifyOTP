const express = require('express');
const { requestCode, verifyCode } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/request-code', requestCode);
router.post('/verify-code', verifyCode);

module.exports = router;
