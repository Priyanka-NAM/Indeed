const Messages = require('../Models/MessageModel')
const Employer = require('../Models/EmployerModel')

/*
    @ Post
    /indeed/messages/send-message
    Employer Send Message to Job Seeker
 */
const sendMessage = async (req, res) => {
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

const replyMessage = async (req, res) => {
    console.log(req.body)
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


const getMessages = async (req, res) => {
    const { userId, employerId } = req.query;
    console.log(userId, employerId)
    try{
        const messages = await Messages.findOne({$and: [
            {
                "userId": userId
            },
            {
                "employerId": employerId
            }
        ]});
        if (messages) {
            res.status(200).send(messages);
        } else {
            res.status(404).send("Resource not found")
        }
        
    }
    catch(error){
        res.status(500).send('500: Internal Server Error')
    }
}

const getDistinctEmployer = async (req, res) => {
    const { userId } = req.query;
    try{
        const ids = await Messages.find({'userId' : userId}).distinct('employerId')
        if (ids) {
            const employerDetails = await Employer.find({'_id':{$in : ids}})
            if (employerDetails) {
                return res.status(200).send(employerDetails)
            } else {
                return res.status(404).send("Resource not found")
            }
        } else {
            return res.status(404).send("Resource not found")
        }
    }
    catch(error){
        res.status(500).send('500: Internal Server Error')
    } 
}

module.exports = { sendMessage, getMessages, replyMessage, getDistinctEmployer };