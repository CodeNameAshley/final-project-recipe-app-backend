const express = require('express');
const router = express.Router();

const createProfile = require('../controllers/profile')
const getProfiles = require('../controllers/profile')

router.post('/', createProfile.create)
router.get('/', getProfiles.get )

module.exports = router;