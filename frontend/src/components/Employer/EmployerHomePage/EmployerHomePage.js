import React, { useState } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { Box, makeStyles, AppBar, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",

    flexDirection: "row",
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
    height: "130px",
  },
  homeLogo: {
    height: "400px",
    width: "500px",
  },
  inddedLogo: {
    height: "40px",
    paddingRight: "30px",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "650px",
    padding: "20px",
  },
  outlinedInput: {
    borderRadius: "10px",
    border: "0.5px solid #2D2D2D",
    height: "42px",
    width: "100%",
    margin: "10px 0",
  },
  h5: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  h4: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  formhelperText: {
    fontWeight: "600",
    fontSize: "17.5px",
    color: "#4b4b4b",
  },
  checkbox: {
    marginBottom: "10px",
  },
  button: {
    width: "100px",
    borderRadius: "15px",
    height: "40px",
    backgroundColor: "#2557A7",
    color: "white",
  },
  button1: {
    width: "140px",
    borderRadius: "15px",
    height: "60px",
    backgroundColor: "#2557A7",
    color: "white",
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
  formStyle: {
    width: "100%",
  },
  link: {
    paddingRight: "40px",
    color: "white",
  },
}));

function EmployerHomePage() {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.login.isAuth);

  const [jobDetails, setjobDetails] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
    jobLocation: { address: "", city: "", state: "", country: "", zipcode: "" },
    jobType: "Full-Time",
    isRemote: false,
    salary: "",
    jobDescription: {
      compensation: "",
      requirement: "",
      moreInfo: "",
      responsibilites: "",
    },
  });
  let [step, setStep] = useState(1);
  const success = false;
  const isError = false;
  const errorMsg = false;

  return (
    <>
      <AppBar position='static' style={{ background: "#2D2D2D" }}>
        <Toolbar variant='dense'>
          <img
            className={classes.inddedLogo}
            src='/Images/Indeed_Employer_logo.png'
            alt=''
          />
          <div className={classes.navlinks}>
            <Typography
              to='/employer/jobs-posted/:12'
              component={NavLink}
              className={classes.link}>
              Jobs
            </Typography>
            <Typography
              to='/employer/applicants-page'
              component={NavLink}
              className={classes.link}>
              Applicants
            </Typography>
            <Typography
              to='/employer/analytics'
              component={NavLink}
              className={classes.link}>
              Analytics
            </Typography>
            <Typography
              to='/employer/reports'
              component={NavLink}
              className={classes.link}>
              Reports
            </Typography>
            {!isAuth && (
              <Typography to='/' component={NavLink} className={classes.link}>
                <Button className={classes.button} variant='contained'>
                  Sign In
                </Button>
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {success ? alert("User registered successfully") : <></>}
      {isError ? <Box>{errorMsg}</Box> : <></>}
      <Container className={classes.container} maxWidth='xl'>
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/employer/postJob", state: "" }}>
          <Button className={classes.button1} variant='contained'>
            Post a Job
          </Button>
        </Link>
        <img
          className={classes.homeLogo}
          src='/Images/Employer_Home_logo.png'
          alt=''
        />
        {/* <Grid
          container
          spacing={1}
          style={{
            fontSize: "14px",
            backgroundColor: "white",
            padding: "15px 10px",
            margin: "0 -20px ",
          }}>
          <Grid item style={{ cursor: "pointer" }}>
            © 2020 Indeed
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: "pointer" }}>
            Accessibility at Indeed
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: "pointer" }}>
            Privacy Center
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: "pointer" }}>
            Cookies
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: "pointer" }}>
            Privacy
          </Grid>
          <Grid item>-</Grid>
          <Grid item style={{ cursor: "pointer" }}>
            Terms
          </Grid>
        </Grid> */}
      </Container>
      {/* // : <Redirect to='/' /> */}
    </>
  );
}

export default EmployerHomePage;
