const express = require('express');
const { sendMessage, getEmployerMessages, getJobSeekerMessages } = require('../controllers/MessageController')

const router = express.Router();

router.route('/send-message').post(sendMessage);

router.route('/employer-messages/:employerId').get(getEmployerMessages);

router.route('/user-messages/:userId').get(getJobSeekerMessages);

module.exports = router;