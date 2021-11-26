const Messages = require('../Models/MessageModel')


/*
    @ Post
    /indeed/messages/send-message
    Employer Send Message to Job Seeker
 */

const sendMessage = async(req, res) => {

    const { messageId, employerId, userId, messageText, isReply } = req.body;

    try{
        const newMessage = await Messages.create({
            messageId, employerId, userId, messageText, isReply
        });

        if(newMessage){
            console.log('Message Posted!');
            res.status(201).json({
                _id : newMessage._id,
                messageId: newMessage.messageId,
                employerId: newMessage.employerId,
                userId: newMessage.userId,
                messageText: newMessage.messageText,
                isReply: newMessage.isReply
            })
        }
        else{
            res.status(400);
            throw new Error('400 Bad request: Please try again later. ')
        }
    }
    catch(error){
        res.status(500);
        throw new Error('500 Internal Server Error');
    }
}

/*
   @ Get
   /indeed/messages/employer-messages/:id
   Employer Inbox
 */
const getEmployerMessages = async(req, res) => {
    const { employerId } = req.params;
    try{
        const messages = await Messages.find({'employerId' : employerId});
        res.status(200).send(messages);
    }
    catch(error){
        res.status(500);
        throw new Error('500: Internal Server Error')
    }
}

/*
    @ Get
    /indeed/messages/jobSeeker-messages/:id
    JobSeeker Inbox
 */
const getJobSeekerMessages = async(req, res) => {
    const { userId } = req.params;
    try{
        const messages = await Messages.find({'userId' : userId});
        res.status(200).send(messages);
    }
    catch(error){
        res.status(500).send('500: Internal Server Error')
    }
}

module.exports = { sendMessage, getEmployerMessages, getJobSeekerMessages };