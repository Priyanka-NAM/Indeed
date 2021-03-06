import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_COMPANY_DONE } from "../../Redux/Constants/CompanyReviewConstants";
import { CompanyBox } from "./CompanyBox";
import { useHistory } from "react-router-dom";
import { getCompanyReviews } from "../../Redux/Actions/CompanyReviewAction";
import SearchIcon from "@material-ui/icons/Search";

//import Rating from "@material-ui/lab/Rating";
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxSearch: {
    backgroundColor: "white",
    margin: 0,
    height: "310px",
    backgroundPosition: "bottom right",
    backgroundImage: "url(/Images/companyreview.PNG)",
    backgroundRepeat: "no-repeat",
  },
  outerSearchGrid: {
    marginTop: "50px",
    flexDirection: "column",
    alignContent: "flex-end",
  },
  h3: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  h5: {
    color: "#6f78a5",
    fontWeight: "400",
    marginBottom: "70px",
  },
  outlinedInput: {
    border: "2px solid #cccccc",
    borderRadius: "10px",
    width: "450px",
  },
  formhelperText: {
    color: "#085ff7",
    paddingLeft: "20px",
    cursor: "pointer",
  },
  companiesHiring: {
    marginTop: "50px",
    marginBottom: "20px",
    backgroundColor: "white",
    display: "flex",
  },
}));

export const SearchButton = withStyles((theme) => ({
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

export function CompanyReviews() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [companyName, setcompanyName] = useState("");
  const [location, setlocation] = useState("");

  const companyReviewReducer = useSelector((state) => state.companyReview);

  let { companyNames } = companyReviewReducer;
  useEffect(() => {
    dispatch({
      type: FETCH_COMPANY_DONE,
    });
  }, []);

  const history = useHistory();

  const onTextChange = (e) => {
    setcompanyName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCompanyReviews(companyName, location));
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container className={classes.boxSearch}>
        <Grid
          item
          container
          className={classes.outerSearchGrid}
          xs={6}
          sm={6}
          md={10}
          lg={11}
          xl={7}
        >
          <Grid item>
            <Typography className={classes.h3} variant="h3">
              Find great places to work
            </Typography>
            <Typography className={classes.h5} variant="h5">
              Discover millions of company reviews
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <Grid item>
              <TextField
                className={classes.outlinedInput}
                type="text"
                variant="outlined"
                placeholder="Enter a company name"
                value={companyName}
                onChange={onTextChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.outlinedInput}
                type="text"
                variant="outlined"
                placeholder="Enter Company Location"
                value={location}
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <SearchButton type="submit" variant="contained">
                Search
              </SearchButton>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {companyNames.length !== 0 ? (
        <Grid
          className={classes.companiesHiring}
          item
          container
          xl={9}
          lg={9}
          md={9}
          sm={11}
          xs={12}
        >
          <Grid item container>
            <Grid item>
              <img
                src="/Images/popularcompany.PNG"
                alt="location pin"
                style={{ padding: "5px 0 5px 10px" }}
              />
            </Grid>
            <Grid item>
              <Typography style={{ paddingTop: "15px" }} variant="h5">
                Companies
              </Typography>
            </Grid>
          </Grid>
          <Grid container style={{ width: "1000px" }}>
            {companyNames.map((item) => {
              return (
                <CompanyBox
                  key={item.id}
                  logo={item.logo}
                  name={item.companyName}
                  rating={item.rating}
                  id={item.id}
                  noOfRatings={item.noOfRatings}
                />
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}

      <Grid
        container
        spacing={1}
        style={{
          position: "relative",

          fontSize: "14px",
          backgroundColor: "white",
          padding: "400px 10px",
          margin: "0 -20px ",
        }}
      >
        <Grid item style={{ cursor: "pointer" }}>
          ?? 2020 Indeed
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
      </Grid>
    </Container>
  );
}
