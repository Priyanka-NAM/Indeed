import { Box, makeStyles, Typography, Grid } from '@material-ui/core';
import React , {useEffect, useReducer,useState} from 'react';
import { Button } from '@material-ui/core';
import  FullJobDescription  from './FullJobDescription';
import { useSelector,useDispatch } from 'react-redux';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { postSavedJobs, deleteSavedJobs } from '../../Redux/Actions/JobsAction';

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
    }
})) 
function JobDetails({jobData, index}) {
    console.log("index : ", index)
    const classes = useStyles();
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.login.userDetails.userId)
    const [viewUndo, setViewUndo] = useState([])
    const [display, setDisplay] = useState(false)

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

    return (
        <Box className={classes.container}>
            <Typography variant={'h5'} style={{marginBottom:'10px'}}>
                {jobData.jobTitle}
            </Typography>
            <Box style={{marginBottom:'10px'}}>
            <div style={{fontSize:"14px", fontWeight:"700"}}>
                <Link to='/' style={{color:"#3A74F2"}}>{jobData.companyName}</Link>{'  '}
                {jobData.employerID.averageRating}
                <StarIcon fontSize="small" style={{height:"12px"}} />
                {'  '}<Link to='/' style={{color:"#3A74F2"}}>{jobData.employerID.noOfRatings + ' reviews'}</Link>
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
                <Button className={classes.link} style={{marginTop:'10px', marginBottom:'30px'}}>
                    Apply Now
                </Button>
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