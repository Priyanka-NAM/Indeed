const express = require('express');
const { sendMessage, getEmployerMessages, getJobSeekerMessages, replyMessage, getDistinctEmployer } = require('../controllers/MessageController')

const router = express.Router();

router.route('/send-message').post(sendMessage);

router.route('/reply-message').put(replyMessage);
 
router.route('/employer-messages/').get(getEmployerMessages);

router.route('/user-messages/').get(getJobSeekerMessages);

router.route('/distinct-employers').get(getDistinctEmployer)

module.exports = router;