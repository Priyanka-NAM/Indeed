import { Container, Box, Typography, Grid } from "@material-ui/core";
import Body from "../Home/Body";
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux"

const useStyles = makeStyles(theme=>({
    job_section:{
        padding:'0 8vw',
        position:'relative'
    },
    jobContainer:{
        width:'450px'
    },
    card:{
        border:'1px solid black',
        padding:'15px',
        cursor:'pointer',
        position:'relative',
        height:'300px',
        marginBottom:'20px',
        '&:hover':{
            '& $job_title':{
                textDecoration:'underline'
            }
        },
        borderRadius:'10px'
    },
    job_title:{
        fontWeight:'bold',
        fontSize:'20px'
    },
    job_subTitle:{
        fontSize:'16px'
    },
    job_snippet:{
        margin:'20px 0px 10px 0px',
        fontSize:'15px',
        lineHeight:'1.4rem'
    },
}))

function JobsDisplay(props) {
    const classes = useStyles()
    const jobDetails = useSelector(state=>state.jobs.allJobs)
    console.log("props : ",props.location.state.query)
    const data = {
        "job": props.location.state.query.job,
        "location": props.location.state.query.location
    }
    return ( 
        <Container className={classes.job_section}>
            <Box style={{transform:"scale(0.8) translateX(-12%)"}}>
                <Body />
            </Box>
            <Box style={{display:'flex'}}>
                    <Grid className={classes.jobContainer}  container>  {
                            jobDetails.map((job,index)=>
                            <Grid className={classes.card}  item key={index} lg={12} md={12} sm={12} xs={12} >
                                <Box>
                                    <Typography  className={classes.job_title}>
                                        {job.jobTitle}
                                    </Typography>
                                    <Typography className={classes.job_subTitle}>
                                        {job.companyName}
                                    </Typography>
                                    <Typography className={classes.job_subTitle}>
                                        {job.jobLocation.city}
                                    </Typography>
                                    {/* <Typography className={classes.job_subTitle}>
                                    ₹ {Number(job.startSalary).toLocaleString('en-IN')} - ₹ {Number(job.endSalary).toLocaleString('en-IN')}
                                    </Typography> */}
                                    <div className={classes.job_snippet} >
                                        {job.jobDescription.moreInfo}
                                    </div>
                                    {/* <Typography className={classes.greyText}>
                                        {timeDifference(job.date)}
                                    </Typography> */}
                                </Box>
                                {/* <JobMenu 
                                job={job} 
                                handelSave={handelSave}
                                removeFromSaved={removeFromSaved}/> */}
                            </Grid>)
                        }
                        
                    </Grid>
                </Box>
        </Container>
    );
}

export default JobsDisplay;