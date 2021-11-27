import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import {
  Box,
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Checkbox,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TablePagination from "@material-ui/core/TablePagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { employerAllJob } from "../../../Redux/Actions/EmployerJobPostingAction";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "black",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
    width: "200px",
    borderRadius: "20px",
    height: "50px",
    color: "white",
    backgroundColor: "#065FF7",
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
  cardlook: {
    width: "80%",
    marginLeft: "2%",
  },
  tableHeader: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  root: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  tableBody: {
    marginLeft: "2%",
    marginRight: "2%",
  },
}));

function EmployerJobPostingHome(props) {
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

  const theme = createMuiTheme({
    palette: {
      background: {
        default: "#303030",
      },
    },
  });
  let [step, setStep] = useState(1);
  const success = false;
  const isError = false;
  const errorMsg = false;

  function createData(name, protein) {
    return { name, protein };
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employerAllJob({ employerID: "61a07e89e5d016c47d56338a" }));
    console.log(
      "rm",
      dispatch(employerAllJob({ employerID: "61a07e89e5d016c47d56338a" }))
    );
  });

  const rows = [
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "Job Title", label: "Job Title" },
    {
      id: "Action",
      label: "Action",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  return (
    <div
      style={{
        paddingTop: "3%",
        backgroundColor: "#f2f2f2",
        height: "100%",
      }}>
      <MuiThemeProvider theme={theme} />
      <CssBaseline />
      {success ? alert("User registered successfully") : <></>}
      {isError ? <Box>{errorMsg}</Box> : <></>}
      <Container className={classes.container} maxWidth='xl'>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: "3%",
          }}>
          <Grid>
            <Typography className={classes.h4} variant='h4'>
              Jobs
            </Typography>
          </Grid>
          <Grid style={{ paddingLeft: "75%" }}>
            <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: "/employer/postJob", state: "" }}>
              <Button className={classes.button} variant='contained'>
                Post a Job
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={2} style={{ paddingLeft: "80%" }}></Grid>
        <br />
        <div style={{ height: 400, width: "100%" }}>
          <Paper className={classes.root}>
            <TableContainer className={classes.tablecontainer}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={classes.tableHeader}
                        style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <br />
                <TableBody className={classes.tableBody}>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          role='checkbox'
                          tabIndex={-1}
                          key={row.code}
                          className={classes.eachrow}>
                          <Card className={classes.cardlook}>
                            <CardContent>
                              <Typography variant='h5' component='h2'>
                                Software Engineer
                              </Typography>
                              <Typography
                                className={classes.pos}
                                color='textSecondary'>
                                New York City
                              </Typography>
                              <Typography
                                className={classes.pos}
                                color='textSecondary'>
                                Created: 24th July 2021
                              </Typography>
                            </CardContent>
                          </Card>
                          <br />
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        <br />
        <br />

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
    </div>
  );
}

export default EmployerJobPostingHome;
