import React from 'react';
import { Container, Grid, Box, Typography, Button, OutlinedInput } from '@material-ui/core';
import Header from '../Header/Header';

function UserProfile() {
    const handleEmail = (e) => {
        console.log(e.target.value)
    }
    const handleResume = (e) => {
        console.log(e.target.value)
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
                                <input type="file" name="resumeUpload" />
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