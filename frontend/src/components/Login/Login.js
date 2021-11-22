import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import { 
    Box, 
    Container, 
    Grid, 
    makeStyles, 
    withStyles,
    OutlinedInput, 
    Typography,
    FormHelperText,
    FormControlLabel,
    Checkbox,
    Button
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
//import { makeLoginRequest } from '../../Redux/Login/actions';
import { Link, Redirect } from 'react-router-dom';
import { jobSeekerLogin } from '../../Redux/Actions/LoginAction';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
    },
    boxImg: {
        width: "450px",
        display: "flex",
        height: "40px",
        justifyContent: "center",
        margin: "60px 0 30px"
    },
    imgLogo: {
        height: "30px",
        cursor: "pointer"
    },
    boxForm: {
        backgroundColor: "#ffffff",
        width: "450px",
        padding: "20px"
    },
    outlinedInput: {
        border: "1px solid #cccccc",
        height: "48px",
        width: "450px",
        margin: "7px 0",
    },
    h5: {
        fontWeight: "600"
    },
    formhelperText: {
        fontWeight: "900",
        fontSize: "14px",
        color: "black"
    },
    button: {
        width: "450px",
        borderRadius: "20px",
        height: "40px"
    },
    divider: {
        backgroundColor: "#f2f2f2",
        heigth: "10px",
        width: "150px",
        margin: "0 30px"
    },
    pageBreak: {
        backgroundColor: "#f2f2f2",
        heigth: "10px",
        width: "440px",
        margin: "30px 30px 20px"
    }
}))

const SignInButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
      backgroundColor: "#085ff7",
      cursor: "pointer",
      '&:hover': {
        backgroundColor: "#0542ac",
      },
    },
}))(Button);

export function Login() {
    
    //const {isAuth,isLoading,isError,errorMsg} = useSelector(state=>state.login)
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectHome, setHome] = useState(false);
    const dispatch = useDispatch();
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "email" : email,
            "password" : password 
        }
        dispatch(jobSeekerLogin(data))
        setHome(true)
    }


    return (
        <Container className = {classes.container} maxWidth = "xl">
            {
                redirectHome && <Redirect  to='/'/>
            }
            <Box className = {classes.boxImg}>
                <img
                    className = {classes.imgLogo}
                    src = "/Images/Indeed_logo.png"
                    alt = "Indeed"
                />
            </Box>
            <Box className = {classes.boxForm}>
                <Grid container spacing = {3} >
                    <Grid item>
                        <Typography className = {classes.h5} variant = "h5">Sign In</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant = "body2">
                        By signing in to your account, you agree to Indeed's
                        <Link to='/' style = {{textDecoration: "underline", color: "#085ff8"}} href = "">
                            Terms of Service </Link> and consent to our 
                            <Link to='/' style = {{textDecoration: "underline", color: "#085ff8"}} href = ""> Cookie Policy </Link>
                                and  
                            <Link to='/' style = {{textDecoration: "underline", color: "#085ff8"}} href = ""> Privacy Policy.</Link><br/>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit = { handleSubmit }>
                            <FormHelperText className = {classes.formhelperText}>Email Address</FormHelperText>
                            <OutlinedInput  className = {classes.outlinedInput} onChange = { onEmailChange } value = { email } required type = "text" variant="outlined"/>
                            <FormHelperText className = {classes.formhelperText}>Password</FormHelperText>
                            <OutlinedInput  className = {classes.outlinedInput} onChange = { onPasswordChange } value = { password } required type = "password" variant="outlined"/>
                            <br />
                            <br />
                            <SignInButton type = "submit" className = {classes.button} variant = "contained">
                                Sign In
                            </SignInButton>
                        </form>
                    </Grid>
                    <hr className = {classes.pageBreak}></hr>
                    <Grid item>
                            <Typography style = {{cursor: "pointer", color : "#085ff7", margin:"0 115px"}} variant = "subtitle2" component={Link} to="/signup">
                                New to Indeed? Create an account
                            </Typography>
                        </Grid>

                </Grid>
            </Box>
        </Container>
    )
}