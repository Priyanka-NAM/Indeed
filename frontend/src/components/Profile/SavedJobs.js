import { Box, Button, Container, makeStyles, Typography, OutlinedInput, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import React, { useReducer, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSavedJobs, applyJobs } from '../../Redux/Actions/JobsAction';

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
        
    },
    applyJob: {
        boxSizing:'border-box',
        width: "600px",
        borderRadius:"10px", 
        height: "100vh", 
        backgroundColor: "white",
        outline:'none',
        padding:'40px',
    }
}))

function SavedJobs() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let { userDetails } = useSelector((state) => state.login);
    let sJobs  = useSelector((state) => state.jobs.savedJobs);
    const [open, setOpen] = useState(false);
    const {email} = userDetails
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleResume = (e) => {
        console.log(e.target.value)
    }

    const handleApplyJob = (jobId, employerId) => {
        const data = {
            "userId": userId,
            "jobId": jobId,
            "employerId": employerId
        }
        console.log("emp id", employerId)
        dispatch(applyJobs(data))
        setOpen(false)
    }

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
                            <Button  onClick={handleOpen} className={classes.applyButton}>
                               Apply
                            </Button>
                    <Modal style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                    open={open}
                    onClose={handleClose}>
                    <Box className={classes.applyJob}>
                    <Typography variant="h4" component="h2">
                        Apply for Job
                    </Typography>
                    <hr />
                    <Grid item>
                            <Typography style={{ fontWeight:"600", marginTop:"10px"}}>
                                Name
                            </Typography>
                            <OutlinedInput type="text" style={{width:"300px", height:"40px"}} placeholder="Enter name"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Email
                            </Typography>
                            <OutlinedInput type="email" value={email} style={{width:"300px", height:"40px"}} placeholder="Enter email"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Contact
                            </Typography>
                            <OutlinedInput type="text" style={{width:"300px", height:"40px"}} placeholder="Enter contact"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Location
                            </Typography>
                            <OutlinedInput type="text" style={{width:"300px", height:"40px"}} placeholder="Enter location"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Resume
                            </Typography>
                            <br  />
                            <form onSubmit={handleResume}>
                                <input type="file" name="resumeUpload" />
                                <br />
                                <br />
                                <input type='submit' value='Upload!' />
                            </form>
                            <br />
                            <Button onClick={() => handleApplyJob(job._id,job.employerID)}
                             style={{ color:"black", backgroundColor:"#2D5DCE", width:"100px"}} 
                            variant="contained">Submit</Button>
                    </Grid>
                    </Box>
                </Modal>
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
