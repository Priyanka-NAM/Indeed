import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../config';
import { getDistinctEmployer, getMessages } from '../../Redux/Actions/MessagesAction';
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


function JobSeekerMessage() {
    const classes = useStyles()
    const dispatch = useDispatch();
    let userId = useSelector(state=>state.login.userDetails.userId);
    let employerDetails = useSelector(state=>state.messages.employerDetails)
    let conversation = useSelector(state=>state.messages.conversation)

    const [open, setOpen] = useState(false)
    const [text, setText] = useState("")
    const [reply, setReply] = useState(null)
    const [msg, setMsg] = useState(false)

    useEffect(() => {
        const data = {
            "userId": userId
        }
        dispatch(getDistinctEmployer(data))
    },[open, text])

    const handleMessage = (e) => {
        setText(e.target.value)
    }

    const handleSend = () => {
        setReply(text)
        setText("")
        setMsg(true)
    }

    const displayMessage = async (empId) => {
        const data = {
            "userId": userId,
            "employerId": empId
        }
        await dispatch(getMessages(data))
        setOpen(true)
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={3} className={classes.msg_section}>
                <Typography variant="h5">
                    Messages
                </Typography>
                <br />
                <hr />
                <br />
                {employerDetails && employerDetails.map((emp,key) => 
                    <Grid key={key} item className={classes.employer_section} >
                        <div onClick={() => displayMessage(emp._id)} style={{fontSize:"20px", fontWeight:"700", cursor:'pointer'}}>
                        {emp.employerName}
                        </div>
                    </Grid>
                    )
                }
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6} className={classes.body_section}>
                <Typography variant="h5">
                    <label>Conversation</label>
                </Typography>
                    <Grid item xs={12} style={{marginTop:"90px"}}>
                    </Grid>
                    {open && conversation  && conversation[0].messages.map((msg, key) => 
                        <Grid key={key} item xs={12} style={{fontSize:"20px", textAlign:"right"}}>
                        {msg.messageText}
                        <hr />
                        </Grid>
                    )}
                    <Grid item xs={12} style={{ fontSize:"20px", textAlign:"right"}}>
                        {msg && reply}
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

export default JobSeekerMessage;