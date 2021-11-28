import React, { useState } from "react";
import {
  Container,
  Grid,
  OutlinedInput,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  Box,
  makeStyles,
  withStyles,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { jobSeekerSignUp } from "../../Redux/Actions/SignUpAction";

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
    margin: "60px 0 30px",
  },
  imgLogo: {
    height: "30px",
    cursor: "pointer",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "450px",
    padding: "20px",
  },
  outlinedInput: {
    border: "1px solid #cccccc",
    height: "48px",
    width: "450px",
    margin: "7px 0",
  },
  h5: {
    fontWeight: "600",
  },
  formhelperText: {
    fontWeight: "700",
    fontSize: "14px",
    color: "black",
  },
  checkbox: {
    marginBottom: "10px",
  },
  button: {
    width: "450px",
    borderRadius: "20px",
    height: "40px",
  },
  divider: {
    backgroundColor: "#f2f2f2",
    heigth: "10px",
    width: "150px",
    margin: "0 30px",
  },
  pageBreak: {
    backgroundColor: "#f2f2f2",
    heigth: "10px",
    width: "440px",
    margin: "30px 30px 20px",
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: "#085ff7",
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

const SignInButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

const HelperButton = withStyles((theme) => ({
  root: {
    color: "#000000",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
}))(Button);

function Signup() {
  // const isAuth = useSelector(state=>state.login.isAuth)
  //const isAuth = true;
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(1);
  const [redirectLogin, setLogin] = useState(false);
  const [redirectEmployerDetails, setEmployerDetails] = useState(false);

  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const isAuth = useSelector((state) => state.login.isAuth);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      role: role,
    };
    dispatch(jobSeekerSignUp(data));
    if (role === 0) setLogin(true);
    else if (role === 1) {
      setEmployerDetails(true);
    }
  };
  console.log("isAuth", isAuth);

  return (
    <Container className={classes.container} maxWidth='xl'>
      {redirectLogin && <Redirect to='/login' />}
      {redirectEmployerDetails && <Redirect to='/addemployer' />}
      <Box className={classes.boxImg}>
        <img
          className={classes.imgLogo}
          src={"/Images/Indeed_logo.png"}
          alt='Indeed'
        />
      </Box>
      <Box className={classes.boxForm}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography className={classes.h5} variant='h5'>
              Create an Account (it's free)
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <FormHelperText className={classes.formhelperText}>
                Email Address
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmailChange}
                value={email}
                required
                type='text'
                variant='outlined'
              />
              <FormHelperText className={classes.formhelperText}>
                Password
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onPasswordChange}
                value={password}
                required
                type='password'
                variant='outlined'
              />
              <FormHelperText className={classes.formhelperText}>
                Role
              </FormHelperText>
              <Select onChange={onRoleChange} value={role}>
                <MenuItem value={0}>JobSeeker</MenuItem>
                <MenuItem value={1}>Employer</MenuItem>
                <MenuItem value={3}>Admin</MenuItem>
              </Select>
              <br />
              <br />
              <SignInButton
                type='submit'
                className={classes.button}
                variant='contained'>
                Create Account
              </SignInButton>
            </form>
          </Grid>
          <hr className={classes.pageBreak}></hr>
        </Grid>
      </Box>
      <Grid
        container
        spacing={3}
        style={{
          flexDirection: "column",
          alignContent: "center",
          margin: "20px 0",
          color: "#085ff7",
        }}>
        <Grid item>
          <Typography
            variant='body2'
            component={Link}
            to='/login'
            style={{ cursor: "pointer", color: "#085ff7" }}>
            Have an account? Sign in
          </Typography>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={snackBarOpen}
        autoHideDuration={3000}
        message={<span className='format__id'>Regitered Succesfully</span>}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={() => setSnackBarOpen(false)}
        action={[
          <IconButton
            onClick={() => {
              setSnackBarOpen(false);
            }}
            color='inherit'
            key='close'
            aria-label='close'>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Container>
    // : <Redirect to="/" />
  );
}

export default Signup;
