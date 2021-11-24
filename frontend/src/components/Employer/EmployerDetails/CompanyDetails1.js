import React, { useState } from "react";
import PropTypes from "prop-types";

import { Container, Grid, OutlinedInput, Button } from "@material-ui/core";
import { Box, makeStyles, withStyles, FormHelperText } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import NativeSelect from "@material-ui/core/NativeSelect";
import { isInfo } from "./CompanyDetails1Validation";

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
}));

const SignInButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#164081",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

function CompanyDetails1({
  step,
  setStep,
  employerDetails,
  setemployerDetails,
}) {
  console.log("Step Value in Company Details 1 ", step);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const success = false;
  const isError = false;
  const errorMsg = false;

  const onEmployerDetailsChange = (e) => {
    setemployerDetails({
      ...employerDetails,
      [e.target.name]: e.target.value,
    });
  };
  const onAboutCompanyChange = (e) => {
    const { aboutTheCompany } = employerDetails;
    setemployerDetails({
      ...employerDetails,
      aboutTheCompany: {
        ...aboutTheCompany,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = isInfo(employerDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <>
      {success ? alert("User registered successfully") : <></>}
      {isError ? <Box>{errorMsg}</Box> : <></>}
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <FormHelperText className={classes.formhelperText}>
                Your company's name*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmployerDetailsChange}
                value={employerDetails.companyName}
                error={errors.companyName}
                name='companyName'
                required
                type='text'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Your first and last name*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmployerDetailsChange}
                value={employerDetails.employerName}
                name='employerName'
                required
                type='text'
                error={errors.employerName}
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Your role in the hiring process*
              </FormHelperText>
              <NativeSelect
                className={classes.outlinedInput}
                name='employerRole'
                onChange={onEmployerDetailsChange}
                value={employerDetails.employerRole}
                error={errors.employerRole}>
                <option aria-label='None' />
                <option value={1}>Human Resources Generalist</option>
                <option value={2}>Owner / CEO</option>
                <option value={3}>Hiring Manager</option>
                <option value={4}>Recruiter or Talent Acquisition</option>
                <option value={5}>Assistant or Office Manager</option>
                <option value={6}>Other</option>
              </NativeSelect>
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Street address*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmployerDetailsChange}
                value={employerDetails.streetAddress}
                error={errors.streetAddress}
                required
                type='text'
                name='streetAddress'
              />
              <br />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormHelperText className={classes.formhelperText}>
                    City*
                  </FormHelperText>
                  <OutlinedInput
                    className={classes.outlinedInput}
                    onChange={onEmployerDetailsChange}
                    value={employerDetails.city}
                    error={errors.city}
                    required
                    type='text'
                    variant='outlined'
                    name='city'
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormHelperText className={classes.formhelperText}>
                    State*
                  </FormHelperText>
                  <OutlinedInput
                    className={classes.outlinedInput}
                    onChange={onEmployerDetailsChange}
                    value={employerDetails.state}
                    error={errors.state}
                    required
                    type='text'
                    variant='outlined'
                    name='state'
                  />
                </Grid>
                <Grid item xs>
                  <FormHelperText className={classes.formhelperText}>
                    Zip code*
                  </FormHelperText>
                  <OutlinedInput
                    className={classes.outlinedInput}
                    onChange={onEmployerDetailsChange}
                    value={employerDetails.zipCode}
                    error={errors.zipCode}
                    required
                    type='text'
                    variant='outlined'
                    name='zipCode'
                  />
                </Grid>
              </Grid>
              <br />
              <FormHelperText className={classes.formhelperText}>
                Country*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmployerDetailsChange}
                value={employerDetails.country}
                error={errors.country}
                required
                type='text'
                variant='outlined'
                name='country'
              />
            </form>
          </Grid>
        </Box>

        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item xs={2} justify='flex-end'>
            <SignInButton
              onClick={handleSubmit}
              className={classes.button}
              variant='contained'>
              Save and Continue
            </SignInButton>
          </Grid>
        </Box>
      </Container>
      {/* // : <Redirect to='/' /> */}
    </>
  );
}

CompanyDetails1.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default CompanyDetails1;
