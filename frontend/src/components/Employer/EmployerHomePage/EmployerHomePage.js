import React, { useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Box, makeStyles, AppBar, Link, Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
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
    height: "130px",
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
    width: "450px",
    borderRadius: "20px",
    height: "40px",
    backgroundColor: "#164081",
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
  const isAuth = true;
  const classes = useStyles();
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

  function showStep(step, setStep, jobDetails, setjobDetails) {
    // switch (step) {
    //   case 1:
    //     return (
    //       <JobDetails1
    //         setStep={setStep}
    //         step={step}
    //         jobDetails={jobDetails}
    //         setjobDetails={setjobDetails}
    //       />
    //     );
    //   case 2:
    //     return (
    //       <JobDetails2
    //         setStep={setStep}
    //         step={step}
    //         jobDetails={jobDetails}
    //         setjobDetails={setjobDetails}
    //       />
    //     );
    //   case 3:
    //     return (
    //       <JobDetails3
    //         setStep={setStep}
    //         step={step}
    //         jobDetails={jobDetails}
    //         setjobDetails={setjobDetails}
    //       />
    //     );
    //   default:
    //     return (
    //       <JobDetails1
    //         setStep={setStep}
    //         step={step}
    //         jobDetails={jobDetails}
    //         setjobDetails={setjobDetails}
    //       />
    //     );
    // }
  }

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
          </div>
        </Toolbar>
      </AppBar>
      {success ? alert("User registered successfully") : <></>}
      {isError ? <Box>{errorMsg}</Box> : <></>}
      {/* <Container className={classes.container} maxWidth='xl'> */}

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
      {/* </Container> */}
      {/* // : <Redirect to='/' /> */}
    </>
  );
}

export default EmployerHomePage;
