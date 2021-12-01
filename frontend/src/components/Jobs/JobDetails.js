import { makeStyles, Container, Grid, Box, Typography, Button, OutlinedInput } from '@material-ui/core';
import React , {useEffect, useReducer,useState} from 'react';
import  FullJobDescription  from './FullJobDescription';
import { useSelector,useDispatch } from 'react-redux';
import StarIcon from '@material-ui/icons/Star';
import { Link, useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Modal from '@material-ui/core/Modal';
import { postSavedJobs, deleteSavedJobs, applyJobs } from '../../Redux/Actions/JobsAction';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme=>({
    container:{
        position:'sticky',
        top:'20px',
        marginLeft:'50px',
        alignSelf: 'flex-start',
        border:'1px solid black',
        padding:'20px',
        flex:'1',
        borderRadius:'10px '
    },
    link:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'10px',
        height:'53px',
        padding:'0 25px',
        fontSize:'20px',
        color:'white',
        
        backgroundColor:theme.palette.primary.main,
        '&:hover':{
            color:theme.palette.primary.main,
            backgroundColor:'white',
            border:`1px solid ${theme.palette.primary.main}`

        }
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
function JobDetails({jobData, index}) {
    console.log("index : ", index)
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = useSelector(state=>state.login.isAuth)
    const {userId, email} = useSelector(state=>state.login.userDetails)
    const [viewUndo, setViewUndo] = useState([])
    const [redirectLogin, setLogin] = useState(false)
    const [display, setDisplay] = useState(false)
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log("view undo", viewUndo)
    }, [display])

    const displayUndo = (jobId) => {
        const data = {
            "jobId": jobId,
            "userId": userId
        }
        let temp = viewUndo
        temp[index] = !temp[index]
        setViewUndo(temp)
        setDisplay(!display)
        dispatch(postSavedJobs(data))
        console.log("---", viewUndo)
    }

    const hideUndo = (jobId) => {
        console.log("delete")
        const data = {
            "jobId": jobId,
            "userId": userId
        }
        let temp = viewUndo
        temp[index] = !temp[index]
        setViewUndo(temp)
        setDisplay(!display)
        dispatch(deleteSavedJobs(data))
    }

    const handleResume = (e) => {
        console.log(e.target.value)
    }

    const handleApplyJob = (jobId, employerId) => {
        if (isAuth) {
            const data = {
                "userId": userId,
                "jobId": jobId,
                "employerId": employerId
            }
            dispatch(applyJobs(data))
            setOpen(false)
        } else {
            setLogin(true)
        }
    }

    const handleCompany = (empId) => {
        history.push(`/company/${empId}/snapshot`);
    }

    const handleReviews = (empId) => {
        history.push(`/company/${empId}/reviews`);
    }

    return (
        <Box className={classes.container}>
            {redirectLogin && <Redirect to='/login' />}
            <Typography variant={'h5'} style={{marginBottom:'10px'}}>
                {jobData.jobTitle}
            </Typography>
            <Box style={{marginBottom:'10px'}}>
            <div style={{fontSize:"14px", fontWeight:"700"}}>
            <label style={{cursor:"pointer"}} onClick={() => handleCompany(jobData.employerID._id)}>{jobData.companyName}</label>{'  '}
                {jobData.employerID.averageRating}
                <StarIcon fontSize="small" style={{height:"12px"}} />
                {'  '}<label onClick={() => handleReviews(jobData.employerID._id)}
                 style={{color:"#3A74F2", cursor:"pointer"}}>{jobData.employerID.noOfRatings + ' reviews'}</label>
            </div>
            <div style={{fontWeight:"700"}}>
            {jobData.jobLocation.address}{' '}
            {jobData.jobLocation.city}{' '}{jobData.jobLocation.state}{' '}
            {jobData.jobLocation.country}{' '}{jobData.jobLocation.zipcode}
            </div>
            </Box>
            <Box style={{marginBottom:'10px'}} style={{fontSize:"15px", fontWeight:"700"}}>
            {'Salary $'}{jobData.salary}{' - '}{jobData.isRemote ? 'Remote' : 'On-line'}
            </Box>
            <Grid container>
                <Grid item xs={4}>
                <Button className={classes.link} onClick={handleOpen} style={{marginTop:'10px', marginBottom:'30px'}}>
                    Apply Now
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
                            <Button onClick={() => handleApplyJob(jobData._id,jobData.employerID._id)}
                             style={{ color:"black", backgroundColor:"#2D5DCE", width:"100px"}} 
                            variant="contained">Submit</Button>
                    </Grid>
                    </Box>
                </Modal>
                </Grid>
                <Grid item xs={4}>
                <Button className={classes.link} onClick={() => displayUndo(jobData._id, index)} style={{marginTop:'10px', marginBottom:'30px', backgroundColor:'#A4A7AD'}}>
                    <FavoriteBorderIcon />
                </Button>
                </Grid>
            </Grid>
                {viewUndo[index] && 
                <Grid container spacing={4} style={{backgroundColor:'#CFD2D7', borderRadius:'10px'}}>
                    <Grid item xs={4}>
                        <Link to='/indeed/saved-jobs'>Moved to saved</Link>
                    </Grid>
                    <Grid item xs={4}>
                        <div onClick={() => hideUndo(jobData._id)}>Undo</div>
                    </Grid>
                </Grid>
                }
            <hr />
            <FullJobDescription jobData={jobData} />
        </Box>
    );
}

export default JobDetails;