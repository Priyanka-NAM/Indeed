import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, OutlinedInput } from '@material-ui/core';
import Header from '../Header/Header';
import axios from 'axios';
import { API } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../Redux/Actions/JobsAction';

function UserProfile() {
    let userId = useSelector(state=>state.login.userDetails.userId);
    let profile = useSelector(state=>state.jobs.profile);

    const [resumeFile, setResumeFile] = useState(null)
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch();

    useEffect(async () => {
        const data = {
            "userId": userId
        }
       await dispatch(getUserProfile(data))
    }, [flag])

    const handleEmail = (e) => {
        console.log(e.target.value)
    }

    const handleChange = (e) => {
        setResumeFile(e.target.files[0])
    }

    const handleResume = (e) => {
        e.preventDefault()
        console.log(resumeFile)
        const data = {
            "userId": userId
        }
        const formData = new FormData();
        formData.append('resume', resumeFile)
        formData.append('userId', userId)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        } 
        axios.post(`${API}/resume/updateResume`, formData, config).then((response) => {
            setFlag(!flag)
            console.log(response)
          }).catch((error) => {
              console.log(error);
          })
    }
    return (
        <Container>
            <Box>
                <Grid>
                    <Grid item>
                        <Typography variant = "h5">My Profile</Typography>
                    </Grid>
                    <Grid item>
                            <Typography style={{ fontWeight:"600", marginTop:"10px"}}>
                                Name
                            </Typography>
                            <OutlinedInput type="text" onChange={handleEmail} style={{width:"300px", height:"40px"}} placeholder="Enter name"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Email
                            </Typography>
                            <OutlinedInput type="email" style={{width:"300px", height:"40px"}} placeholder="Enter email"/>
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
                                <input type="file" name="resume" onChange={handleChange} /> 
                                <br />
                                {profile && profile.resume}
                                <br />
                                <br />
                                <input type='submit' value='Upload!' />
                            </form>
                            <br />
                            <Button style={{ color:"black", backgroundColor:"#2D5DCE", width:"100px"}} variant="contained">Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
     );
}

export default UserProfile;