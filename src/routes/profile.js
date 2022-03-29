const express = require('express');
const router = express.Router();

const {
    getProfile,
} = require('../controllers/profile')

router.post('/', getProfile)

module.exports = router;