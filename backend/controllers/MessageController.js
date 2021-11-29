const Messages = require('../Models/MessageModel')


/*
    @ Post
    /indeed/messages/send-message
    Employer Send Message to Job Seeker
 */
const sendMessage = async(req, res) => {

    try{

        const newMessage = await Messages.create({
            employerId: req.body.employerId,
            userId: req.body.userId
        })

        newMessage.messages.push(
            {from : req.body.message.from,
                to: req.body.message.to,
                messageText: req.body.message.messageText
            })

        await newMessage.save()

        if(newMessage){
            res.status(200).send(newMessage)
        }
        else{
            res.status(400).send("Error while sending Message")
        }
    }
    catch(error){
        res.status(500);
        throw new Error('500 Internal Server Error');
    }
}

const replyMessage = async(req, res) => {
    try{
        const getMessage = await Messages.findById({_id: req.body._id})

        getMessage.messages.push({
            from: req.body.message.from,
            to: req.body.message.to,
            messageText: req.body.message.messageText
        })

        await getMessage.save()

        if(getMessage){
            res.status(200).send(getMessage)
        }
        else{
            res.status(400).send('Unable to reply for the message!')
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

module.exports = { sendMessage, getEmployerMessages, getJobSeekerMessages, replyMessage };