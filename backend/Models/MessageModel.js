const mongoose = require('mongoose');
console.log("message");
const messageSchema = mongoose.Schema({
    messageId: {
        type: Number,
        required: true
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messageText: {
        type: String,
        required: true
    },
    isReply: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
})

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
