import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import {
  Container,
  Grid,
  OutlinedInput,
  Button,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { Box, makeStyles, withStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import { postSavedJobs, deleteSavedJobs } from "../../Redux/Actions/JobsAction";
import NativeSelect from "@material-ui/core/NativeSelect";

// import { isInfo } from "./CompanyDetails1Validation";
import FullJobDescription from "./../../Jobs/FullJobDescription";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     backgroundColor: "#f2f2f2",

//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   boxImg: {
//     width: "450px",
//     display: "flex",
//     height: "40px",
//     justifyContent: "center",
//     margin: "60px 0 30px",
//   },
//   imgLogo: {
//     height: "130px",
//   },
//   inddedLogo: {
//     height: "40px",
//   },
//   boxForm: {
//     backgroundColor: "#ffffff",
//     width: "650px",
//     padding: "20px",
//   },
//   outlinedInput: {
//     borderRadius: "10px",
//     border: "0.5px solid #2D2D2D",
//     height: "42px",
//     width: "100%",
//     margin: "10px 0",
//   },
//   h5: {
//     fontWeight: "bold",
//     fontSize: "1.4rem",
//     fontFamily:
//       "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
//   },
//   h4: {
//     fontSize: "1.75rem",
//     fontWeight: "bold",
//     fontFamily:
//       "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
//   },
//   formhelperText: {
//     fontWeight: "600",
//     fontSize: "17.5px",
//     color: "#4b4b4b",
//   },
//   checkbox: {
//     marginBottom: "10px",
//   },
//   button: {
//     width: "300px",
//     borderRadius: "20px",
//     height: "40px",
//     backgroundColor: "#164081",
//   },
//   divider: {
//     backgroundColor: "#f2f2f2",
//     heigth: "10px",
//     width: "150px",
//     margin: "0 30px",
//   },
//   pageBreak: {
//     backgroundColor: "#f2f2f2",
//     heigth: "10px",
//     width: "440px",
//     margin: "30px 30px 20px",
//   },
//   formStyle: {
//     width: "100%",
//   },
// }));

const useStyles = makeStyles((theme) => ({
  container: {
    top: "20%",
    marginLeft: "30%",
    alignSelf: "flex-start",
    border: "1px solid blue",
    padding: "20px",
    flex: "1",
    borderRadius: "10px ",
    width: "40%",
    marginTop: "2%",
    fontFamily: "Noto Sans,Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "650px",
    padding: "20px",
  },

  imgLogo: {
    height: "130px",
  },
  h4: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    height: "53px",
    padding: "0 25px",
    fontSize: "20px",
    color: "white",

    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

function EachJobDetails(props) {
  let location = useLocation();
  let jobData = {};
  if (location.state.row) {
    jobData = location.state.row.eachjob;
  }

  console.log("Job Details ", jobData);
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const success = false;
  const isError = false;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userDetails.userId);
  const index = useSelector((state) => state.login.userDetails.userId);

  const [viewUndo, setViewUndo] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    console.log("view undo", viewUndo);
  }, [display]);

  const displayUndo = (jobId) => {
    const data = {
      jobId: jobId,
      userId: userId,
    };
    let temp = viewUndo;
    temp[index] = !temp[index];
    setViewUndo(temp);
    setDisplay(!display);
    console.log("---", viewUndo);
  };

  const hideUndo = (jobId) => {
    console.log("delete");
    const data = {
      jobId: jobId,
      userId: userId,
    };
    let temp = viewUndo;
    temp[index] = !temp[index];
    setViewUndo(temp);
    setDisplay(!display);
  };

  return (
    <>
      <Box className={classes.container}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={6}>
            <Typography className={classes.h4} variant='h4'>
              Job Information
            </Typography>
          </Grid>
          <br />
          <Grid item xs={6}>
            <img
              className={classes.imgLogo}
              src='/Images/Employer_Jobss_logo.png'
              alt=''
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.container}>
        <div>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/employer/applicant-page/${jobData._id}`,
              state: {},
            }}>
            <Typography variant={"h5"} style={{ marginBottom: "2px" }}>
              {jobData.jobTitle}
            </Typography>
          </Link>
        </div>
        <div>
          <Typography
            style={{
              marginBottom: "2px",
              fontSize: "12pt",
              fontWeight: "400",
            }}>
            {jobData.companyName}
          </Typography>
        </div>
        <div>
          <Typography
            style={{
              marginBottom: "2px",
              fontSize: "12pt",
              fontWeight: "400",
            }}>
            {jobData.jobLocation.address} {jobData.jobLocation.city}{" "}
            {jobData.jobLocation.state}
          </Typography>
        </div>
        <div>
          <Typography
            style={{
              marginBottom: "2px",
              fontSize: "12pt",
              fontWeight: "400",
            }}>
            {jobData.jobLocation.country} {jobData.jobLocation.zipcode}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography
            variant={"h5"}
            style={{ marginBottom: "15px", fontSize: "1.125rem" }}>
            Job Details
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Salary
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            ${jobData.salary}
          </Typography>
        </div>

        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Job Type
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobType}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Is Remote{" "}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "2px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.isRemote}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography
            variant={"h5"}
            style={{ marginBottom: "15px", fontSize: "1.125rem" }}>
            Job Description
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobDescription.moreInfo}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Requirement
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobDescription.requirement}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Responsibilities
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobDescription.responsibilites}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Compensation{" "}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            ${jobData.jobDescription.compensation}
          </Typography>
        </div>
        {/* <FullJobDescription jobData={jobData} /> */}
      </Box>
    </>
  );
}

export default EachJobDetails;
