import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useReducer, useState } from "react";
import { Button } from "@material-ui/core";
import {
  Element,
  Events,
  animateScroll as scroll,
  scroller,
} from "react-scroll";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    alignSelf: "flex-start",
    border: "1px solid black",
    padding: "20px",

    flex: "1",
    borderRadius: "10px ",
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
function JobDescription({ jobData }) {
  const classes = useStyles();
  const { companyName, jobLocation, jobTitle, jobDescription, salary } =
    jobData;

  return (
    <div>
      <Element
        name="test7"
        className="element"
        id="containerElement"
        style={{
          position: "relative",
          height: "500px",
          width: "500px",
          left: "150px",
          top: "100px",

          overflow: "scroll",
        }}
      >
        <Element name="firstInsideContainer" style={{}}>
          <div>
            <label style={{ fontWeight: "700", fontSize: "22px" }}>
              Job Salary
            </label>
            <br />
            <label style={{ fontWeight: "700", fontSize: "17px" }}>
              Salary
            </label>
            <br />
            <label style={{ fontSize: "15px" }}>
              {"$" + jobData.salary + " a year"}
            </label>
            <br />
            <label style={{ fontWeight: "700", fontSize: "17px" }}>
              Job Type
            </label>
            <br />
            <label style={{ fontSize: "15px" }}>{jobData.jobType}</label>
          </div>
          <hr />
          <div>
            <label style={{ fontWeight: "700", fontSize: "22px" }}>
              Full Job Description
            </label>
            <ul style={{ marginLeft: "30px" }}>
              <li style={{ listStyleType: "circle" }}>
                {jobData.jobDescription.compensation}
                {"."}
              </li>
              <li style={{ listStyleType: "circle" }}>
                {jobData.jobDescription.responsibilites}
                {"."}
              </li>
              <li style={{ listStyleType: "circle" }}>
                {jobData.jobDescription.requirement}
                {"."}
              </li>
              <li style={{ listStyleType: "circle" }}>
                {jobData.jobDescription.moreInfo}
                {"."}
              </li>
              <br />
              <li>
                <Button color={"primary"} variant="contained" type="submit">
                  Apply
                </Button>
              </li>
            </ul>
          </div>
        </Element>
      </Element>
    </div>
  );
}

export default JobDescription;
