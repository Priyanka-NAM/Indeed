import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useReducer, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSavedJobs } from '../../Redux/Actions/JobsAction';

const useStyles = makeStyles((theme)=>({
    applyButton:{
        color:'white',
        width:"200px",
        height:'40px',
        borderRadius:'10px',
        backgroundColor:'#306ACA',
        marginRight:'2%',
        '&:hover':{
            color:'white',
            
            borderRadius:'10px',
            backgroundColor:'#306ACA',
            marginRight:'2%',
        }
    },
    updateButton:{
        color:'#0145E3',
        width:"200px",
        height:'40px',
        border:'2px solid #909090',
        borderRadius:'10px',
        
    }
}))

function SavedJobs() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let { userDetails } = useSelector((state) => state.login);
    let sJobs  = useSelector((state) => state.jobs.savedJobs);
    let savedJobs = null
    if (sJobs) {
        savedJobs = sJobs.savedJobs
    } 
    const { userId } = userDetails;
    useEffect(() => {
        const data = {
            "userId": userId
        }
        dispatch(getSavedJobs(data))
    }, [])
    return (
        <Container style={{display:'flex'}}>
            <Box>
                <Typography variant={'h5'} style={{fontSize:'30px',marginBottom:'20px'}}>
                    My Jobs
                </Typography>
                <ul style={{display:'flex',marginBottom:'20px'}}>
                    <NavLink to="/savedjobs" activeStyle={{
                        color:"#0145E3",
                        textDecoration:'underline'}} style={{fontSize:'20px',marginRight:"30px"}}>
                        Saved {savedJobs && savedJobs.length}
                    </NavLink>
                    <NavLink to="/appliedjobs" style={{fontSize:'20px'}}>
                        Applied 0
                    </NavLink>
                </ul>
                <hr />
                <Box>
                    {savedJobs && savedJobs.map((job,key) => {
                        return(
                    <Box style={{display:'flex', borderBottom:'1px solid black', marginTop:'10px'}} key={key}>
                        <Box style={{width:'500px'}}>
                            <Typography variant='h5' style={{fontSize:'18px',marginBottom:'15px'}}> 
                                {job.jobTitle}
                            </Typography>
                            <Box style={{marginBottom:'15px'}}>
                                    {job.companyName}<br />
                                    {job.jobLocation.city}
                                    {', '}{job.jobLocation.state}
                            </Box>
                        </Box>
                        <Box style={{display:'flex'}}>
                            <Button className={classes.applyButton}>
                               Apply
                            </Button>
                            <Button className={classes.updateButton}>
                                Update
                            </Button>
                        </Box>
                        <Box style={{cursor:"pointer",width:"40px",height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}} >
                            <span style={{fontSize:"20px"}}>X</span>
                        </Box>
                        <hr />
                    </Box>
                )}
                )
                }
                </Box>
                </Box>
        </Container>
    );
}

export default SavedJobs;
