import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompanySalaries } from "../../Redux/Actions/SalaryAction";
import { useSelector } from "react-redux";
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
import { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";

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

export function FindSalaries() {
  const [jobTitle, setjobTitle] = useState("");
  const [location, setlocation] = useState("");
  const [filterValue, setFilterValue] = useState(false);
  const [filteredSalaries, setFilterSalaries] = useState([]);
  const [displayTitle, setDisplayTitle] = useState("");
  const [averageSalary, setaverageSalary] = useState(0);
  let { companySalaries } = useSelector((state) => state.salary);
  const onTextChange = (e) => {
    setjobTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle && location) {
      let arr = companySalaries.filter(
        (row) =>
          row.jobLocation.toLowerCase().indexOf(location.toLowerCase()) > -1
      );

      arr = arr.filter(
        (row) =>
          row.jobLocation.toLowerCase().indexOf(location.toLowerCase()) > -1
      );
      setFilterSalaries(arr);
      const average =
        arr.reduce((total, next) => total + parseInt(next.currentPay), 0) /
        arr.length;
      setaverageSalary(average);
      setDisplayTitle(arr.length > 0 ? arr[0].jobTitle : "");
      setFilterValue(true);
    }
  };

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanySalaries());
    setFilterValue(false);
  }, [dispatch]);

  return (
    <div>
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
                Find a career you'll love
              </Typography>
              <Typography className={classes.h5} variant="h5">
                Explore which careers have the highest job satisfaction, best
                salaries, and more
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <Grid item>
                <TextField
                  className={classes.outlinedInput}
                  type="text"
                  variant="outlined"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={onTextChange}
                  required
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
                  required
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
      </Container>
      {filterValue && (
          <h1>
            {" "}
            Average Salary of {displayTitle} in {location} is {averageSalary}
          </h1>
        ) && (
          <h1> Top Companies {filteredSalaries.map((c) => c.companyName)}</h1>
        )}
    </div>
  );
}
