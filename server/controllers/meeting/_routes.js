const express = require('express');
const meeting = require('./meeting');
const auth = require('../../middelwares/auth');

const router = express.Router();

// Meeting routes
router.post('/meeting', auth, meeting.add); // Create a new meeting
router.get('/meeting',  auth, meeting.index); // Get all meetings
router.get('/meeting/:id', auth, meeting.view); // Get a single meeting by ID
router.delete('/meeting/:id', auth, meeting.deleteData); // Delete a single meeting by ID
router.post('/meeting/delete-many', auth, meeting.deleteMany); // Delete multiple meetings

module.exports = router