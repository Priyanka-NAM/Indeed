import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Box,
  makeStyles,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Stack, Animation } from "@devexpress/dx-react-chart";
import { withStyles } from "@material-ui/core/styles";
import EmployerBarChart from "./EmployerBarChart";
const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);
const theme = createMuiTheme({
  palette: {
    backgroundColor: {
      xs: "red",
      sm: "blue",
      md: "green",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "black",
  },
  container: {
    backgroundColor: "#f2f2f2",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    marginLeft: "20%",
  },

  boxImg: {
    width: "450px",
    display: "flex",
    height: "40px",
    justifyContent: "center",
    margin: "60px 0 30px",
  },
  imgLogo: {
    height: "180px",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "60%",
    marginLeft: "30%",
    marginTop: "2%",
  },
  "@global": {
    body: {
      [theme.breakpoints.up("md")]: {
        backgroundColor: theme.palette.background.md,
      },
    },
  },
}));

function EmployerPieChart() {
  // Sample data
  const classes = useStyles();

  const data = [
    { status: "Applicants Applied", value: 80 },
    { status: "Applicants Rejected", value: 20 },
    { status: "Applicants Selected", value: 40 },
  ];
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.h4} variant='h4'>
                Jobs Report
              </Typography>
            </Grid>
            <br />
            <Grid item xs={6}>
              <img
                className={classes.imgLogo}
                src='/Images/Employer_Reports_Logo.png'
                alt=''
              />
            </Grid>
          </Grid>
        </Box>

        <Container
          style={{ display: "flex", flexDirection: "row", marginTop: "4%" }}>
          <Paper style={{ width: "50%" }}>
            <Chart data={data}>
              <PieSeries
                valueField='value'
                argumentField='status'
                name='Applicants Selected'
              />
              <Title text='Total Applicants' />
              <Animation />
              <Legend />
            </Chart>
          </Paper>{" "}
          <Typography
            variant='h5'
            component='h2'
            style={{ marginLeft: "4%", flex: "4" }}></Typography>
          <EmployerBarChart />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default EmployerPieChart;
