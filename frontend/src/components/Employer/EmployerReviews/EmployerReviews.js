import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Grid } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Rating } from "@mui/material";
import {
  getcompaniesDetails,
  getCompanySpecificReviews,
} from "../../../Redux/Actions/Company";
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
    height: "150px",
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
  cardlook: {
    width: "100%",
    height: "80%",
    // marginLeft: "2%",
  },
  h5: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  pos: {
    marginLeft: "5%",
  },
  h6: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
}));

function EmployerReviews(props) {
  const dispatch = useDispatch();
  const { companySpecificReviews } = useSelector(
    (state) => state.companyReviewList
  );
  useEffect(() => {
    // if (props.match.params.pathname === "reviews")
    console.log("companySpecificReviews");
    dispatch(
      getCompanySpecificReviews({
        employerId: "619f0cdd8188bc6c174294cf",
      })
    );
    console.log("payload Details ", companySpecificReviews);
  }, [props]);

  let rows = [];
  function createData(reviewTitle, overallRating, pros, cons) {
    return { reviewTitle, overallRating, pros, cons };
  }
  if (companySpecificReviews && companySpecificReviews.length > 0) {
    rows = companySpecificReviews.map((eachreview) => {
      return createData(
        eachreview.reviewTitle,
        eachreview.overallRating,
        eachreview.pros,
        eachreview.cons
      );
    });
  }
  const classes = useStyles();

  return (
    <>
      <Box className={classes.container}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={6}>
            <Typography className={classes.h4} variant='h4'>
              Employee Reviews
            </Typography>
          </Grid>
          <br />
          <Grid item xs={6}>
            <img
              className={classes.imgLogo}
              src='/Images/Employer_Reviews_logo.png'
              alt=''
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.container}>
        {rows.map((row) => {
          return (
            <>
              <Card className={classes.cardlook}>
                <CardContent>
                  <Typography style={{ display: "flex" }}>
                    <Typography
                      variant='h5'
                      component='h2'
                      style={{ flex: "1" }}>
                      <Typography className={classes.h4} variant='h4'>
                        <h4 style={{ borderBottom: "3px dotted #000" }}>
                          {row.overallRating}.0
                        </h4>
                        <Rating
                          name='size-small'
                          style={{ color: "#9d2b6b" }}
                          value={row.overallRating}
                          size='small'
                          precision={0.5}
                          readOnly
                        />
                      </Typography>
                    </Typography>
                    <br />
                    <Typography
                      variant='h5'
                      component='h2'
                      style={{ marginLeft: "4%", flex: "4" }}>
                      {row.reviewTitle}
                    </Typography>
                  </Typography>
                  <Grid
                    item
                    container
                    spacing={3}
                    style={{ marginLeft: "1%", marginTop: "3%" }}>
                    <span>
                      <i class='fas fa-check' style={{ color: "green" }}></i>
                    </span>
                    <div spacing={3}>
                      <b> Pros </b>
                    </div>
                    <br></br>
                  </Grid>
                  <br />

                  <Typography className={classes.pos} color='textSecondary'>
                    {row.pros}
                  </Typography>
                  <Grid
                    item
                    container
                    spacing={3}
                    style={{ marginLeft: "1%", marginTop: "2%" }}>
                    <i
                      class='fa fa-times'
                      aria-hidden='true'
                      style={{ color: "red" }}></i>
                    <br></br>
                    <div spacing={3}>
                      <b>Cons </b>{" "}
                    </div>
                  </Grid>
                  <br />

                  <Typography className={classes.pos} color='textSecondary'>
                    {row.cons}
                  </Typography>
                  <Typography style={{ display: "flex" }}>
                    <Typography
                      variant='h5'
                      component='h2'
                      style={{ flex: "4" }}>
                      <Typography
                        className={classes.h4}
                        variant='h4'></Typography>
                    </Typography>
                    <Typography
                      className={classes.h6}
                      variant='h6'
                      component='h6'>
                      Featured?
                    </Typography>
                    <Typography variant='h5' component='h2'>
                      <BookmarkBorderIcon onClick={{}} />
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
              <br />
            </>
          );
        })}
      </Box>
    </>
  );
}

export default EmployerReviews;
