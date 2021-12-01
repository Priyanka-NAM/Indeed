import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {  sendMessageAction, getMessages, replyMessageAction } from '../../../Redux/Actions/MessagesAction';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles(theme=>({
    msg_section: {
        backgroundColor:"#EFF3F9", 
        borderRadius:"10px"
    },
    body_section: {
        backgroundColor:"#EFF3F9", 
        borderRadius:"10px"
    },
    employer_section: {
        marginTop:"10px",
        borderBottom:"1px solid black",
    },
    outlinedInput: {
        height: "48px",
        width: "400px"
    },
}))


function EmployerMessage() {
    const classes = useStyles()
    const dispatch = useDispatch();
    // let userId = useSelector(state=>state.login.userDetails.userId);
    // let employerDetails = useSelector(state=>state.messages.employerDetails)
    let conversation = useSelector(state=>state.messages.conversation)
    let successResponse = useSelector(state=>state.messages.successResponse)

    const [text, setText] = useState("")

    useEffect(() => {
        const data = {
            "userId": "61a40bfc844e19451386004d",
            "employerId": "619f0c548188bc6c174294c7"
        }
        dispatch(getMessages(data))
    },[successResponse])

    const handleMessage = (e) => {
        setText(e.target.value)
    }

    const handleSend = async () => {
        if (conversation) {
            const data = {
                "_id": conversation._id,
                "message": {
                    "from": conversation.userId,
                    "to": conversation.employerId,
                    "messageText": text
                }
            }
            await dispatch(replyMessageAction(data))
        } else {
            const data = {
                "userId": "61a40bfc844e19451386004d",
                "employerId": "619f0c548188bc6c174294c7",
                "message": {
                    "from": "619f0c548188bc6c174294c7",
                    "to": "61a40bfc844e19451386004d",
                    "messageText": text
                }
            }
           await dispatch(sendMessageAction(data))
        }
        setText("")
    }


    return (
        <Container style={{marginTop:"10px"}}>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.msg_section}>
                <Typography variant="h5">
                    Messages
                </Typography>
                <br />
                <hr />
                <br />
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6} className={classes.body_section}>
                <Typography variant="h5">
                    <label>Conversation</label>
                </Typography>
                    <Grid item xs={12} style={{marginTop:"90px"}}>
                    </Grid>
                    {conversation  && conversation.messages.map((msg, key) => 
                        <Grid key={key} item xs={12} style={{fontSize:"20px", textAlign:"right"}}>
                        {msg.messageText}
                        <hr />
                        </Grid>
                    )}
                    <Grid item xs={12} style={{ fontSize:"20px", textAlign:"right"}}>
                        
                    </Grid>
                    <hr  />
                    <Grid container spacing={2}>
                    <Grid item xs={8} style={{marginTop:"90px", textAlign:"left"}}>
                    <TextField className={classes.outlinedInput} value={text} onChange={handleMessage} label="Type here" variant="standard" />
                    </Grid>
                    <Grid item xs={4} style={{marginTop:"90px", textAlign:"left"}}>
                    <Button onClick={handleSend} color={'primary'} style={{marginTop:"10px"}}
                     variant='contained' type='submit'>send</Button>
                    </Grid>
                    </Grid>
                </Grid>
                </Grid>
        </Container>
    );
}

export default EmployerMessage;