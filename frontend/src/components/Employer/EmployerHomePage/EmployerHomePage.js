import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import {
  getcompaniesDetails,
  getCompanySpecificReviews,
} from "../../../Redux/Actions/Company";
import axios from "axios";
// import { ReviewBox } from "../Review/ReviewBox";
import StarIcon from "@material-ui/icons/Star";
import { Rating } from "@mui/material";
import { ReviewBox } from "../../Company/ReviewBox";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import CameraAltIcon from "@material-ui/icons/CameraAltRounded";
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";
// import { SearchButton } from "../CompanyReviews/CompanyReviews";
import { API } from "../../../config";

import {
  Grid,
  Container,
  makeStyles,
  FormHelperText,
  Box,
  Typography,
  Button,
  withStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ButtonGroup,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import EmployerCompanyDetailsUpdate from "../EmployerDetails/EmployerCompanyDetailsUpdate";

const useStyle = makeStyles((theme) => ({
  formhelperText: {
    color: "#085ff7",
    paddingLeft: "20px",
    cursor: "pointer",
    fontSize: "17px",
  },
  outlinedInput: {
    width: "700px",
  },
  formStyle: {
    width: "100%",
  },

  imgCont: {
    padding: "5px",
    borderRadius: "5px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  optionTab: {
    cursor: "pointer",
    margin: "0 40px 0 40px",
  },
  activeTab: {
    cursor: "pointer",
    margin: "0 40px 0 40px",
    fontWeight: "bold",
    borderBottom: "5px solid #000000",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    height: 700,
    width: 768,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const FollowButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    width: "200px",
    borderRadius: "200px",
    height: "43px",
    marginLeft: "50px",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "22px",
    marginLeft: "50px",
  },
}));

const UplaodButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    width: "200px",
    borderRadius: "200px",
    height: "53px",
    marginLeft: "50px",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

export default function EmployerHomePage(props) {
  const classes = useStyle();
  const showCompany = () => <EmployerCompanyDetailsUpdate />;
  const showPhotos = () => <EmployerCompanyDetailsUpdate />;

  const changePathName = (pathName) => {
    props.history.push(
      `/employer/details/${pathName}/${"619f0cdd8188bc6c174294cf"}`
    );
  };
  const { responseFromServer } = useSelector((state) => state.companyDetails);
  const { companySpecificReviews } = useSelector(
    (state) => state.companyReviewList
  );
  const companyDetails = responseFromServer
    ? responseFromServer
    : { aboutTheCompany: {} };
  return (
    <Container maxwidth='xl' style={{ marginTop: "5%" }}>
      <div
        class='jumbotron text-white jumbotron-image shadow'
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80)`,
          backgroundSize: "cover",
          height: "250px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}></div>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}>
        <Grid container item lg={6} md={7} sm={8}>
          <Grid item className={classes.imgCont}>
            <img
              src='https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80'
              alt=''
              width='100px'
            />
          </Grid>
          <Grid item style={{ paddingTop: "40px", paddingLeft: "20px" }}>
            <Typography variant='h5'>{companyDetails.companyName}</Typography>
            <Typography variant='h5'>
              {companyDetails.noOfRatings}
              {/* <StarIcon style = {{color: "#9d2b6b", paddingRight: "10px"}}/> */}
              <Rating
                name='half-rating-read'
                style={{ color: "#9d2b6b", paddingRight: "10px" }}
                // value={rating}
                precision={0.5}
                readOnly
              />
              {companySpecificReviews && (
                <Typography variant='caption'>
                  {companySpecificReviews.length} reviews
                </Typography>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          {/* <Button
            color={"primary"}
            variant='contained'
            type='submit'
            onClick={}>
            {" "}
            Review this Company{" "}
          </Button> */}
          <br />
          {/* <Typography variant="caption" >Get weekly updates, new jobs, and reviews</Typography> */}
        </Grid>
      </Grid>

      <Grid container style={{ height: "40px" }}>
        <Grid
          item
          className={
            props.match.params.pathname === "company"
              ? classes.activeTab
              : classes.optionTab
          }
          onClick={() => changePathName("company")}>
          Company
        </Grid>
        <Grid
          item
          className={
            props.match.params.pathname === "whyjoinus"
              ? classes.activeTab
              : classes.optionTab
          }
          onClick={() => changePathName("whyjoinus")}>
          Why Join Us
        </Grid>
        <Grid
          item
          className={
            props.match.params.pathname === "reviews"
              ? classes.activeTab
              : classes.optionTab
          }
          onClick={() => changePathName("reviews")}>
          Reviews
        </Grid>

        <Grid
          item
          className={
            props.match.params.pathname === "photos"
              ? classes.activeTab
              : classes.optionTab
          }
          onClick={() => changePathName("photos")}>
          Photos
        </Grid>
      </Grid>
      <hr style={{ marginTop: 0 }}></hr>
      {props.match.params.pathname === "company" && showCompany()}
      {props.match.params.pathname === "photos" && showPhotos()}

      {/* {props.match.params.pathname === "reviews" && showReviews()}
      {props.match.params.pathname === "photos" && showPhotos()}
      {props.match.params.pathname === "whyjoinus" && showWhyJoinUs()} */}
      {/* {showFooter()} */}
    </Container>
  );
}
