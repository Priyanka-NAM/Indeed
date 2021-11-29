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
  const [modalStyle] = React.useState(getModalStyle);
  const { responseFromServer } = useSelector((state) => state.companyDetails);
  const loginReducer = useSelector((state) => state.login);
  const { isAuth, userDetails } = loginReducer;

  const [newRating, setnewRating] = useState(0);
  const [reviewSummary, setReviewSummary] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [workHappinessScore, setWorkHappinessScore] = useState(0);
  const [learningScore, setLearningScore] = useState(0);
  const [appreciationScore, setAppreciationScore] = useState(0);
  const [reviewRole, setReviewRole] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [city, setCity] = useState("");
  const [st, setState] = useState("");

  const [interviewPrep, setinterviewPrep] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    isAuth ? setOpen(true) : props.history.push("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { companySpecificReviews } = useSelector(
    (state) => state.companyReviewList
  );
  const companyDetails = responseFromServer
    ? responseFromServer
    : { aboutTheCompany: {} };
  console.log(companySpecificReviews);
  const [values, setValues] = React.useState(["Helpfullness", "Rating"]);
  const [filterValue, setFilterValue] = React.useState(["Helpfullness"]);
  const [sortValue, setSortValue] = React.useState("overallRating");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(4);
  const query = new URLSearchParams(props.location.search);
  const id = query.get("id");
  const dispatch = useDispatch();

  const [tooltipopen, setTooltipopen] = React.useState(true);

  useEffect(() => {
    if (props.match.params.pathname === "snapshot")
      dispatch(getcompaniesDetails({ employerID: "619f0cdd8188bc6c174294cf" }));
    else if (props.match.params.pathname === "reviews")
      dispatch(
        getCompanySpecificReviews({
          employerId: "619f0cdd8188bc6c174294cf",
          sort: sortValue,
        })
      );
    setRating(companyDetails.noOfRatings);
  }, [props.match, sortValue]);

  const changePathName = (pathName) => {
    props.history.push(`/company/${"619f0cdd8188bc6c174294cf"}/${pathName}`);
  };
  const handleSort = (val) => {
    setSortValue(val);
  };
  const reviewSubmithandler = async (event) => {
    event.preventDefault();
    console.log(cons);
    await axios
      .post(`${API}/company/user-review`, {
        overallRating: newRating,
        workHappinessScore,
        learningScore,
        appreciationScore,
        reviewRole,
        reviewTitle,
        city,
        state: st,
        yourReview: reviewSummary,
        employerId: props.match.params.id,
        userId: userDetails.userId,
        pros: pros,
        cons: cons,
        interviewPreparation: interviewPrep,
      })
      .then((response) => {
        console.log(response.data);
        setOpen(false);
        setnewRating(0);
        setReviewSummary("");
        setPros("");
        setCons("");
        setWorkHappinessScore(0);
        setLearningScore(0);
        setAppreciationScore(0);
        setReviewRole("");
        setReviewTitle("");
        setCity("");
        setState("");
        setinterviewPrep("");
      })
      .catch((error) => {});
  };

  //SnapShot page strats here
  const showSnapShot = () => (
    <div>
      <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography variant='caption'>
          {companyDetails.employerName} Careers and Employment
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant='h5'>
          <b>Work happiness</b>
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography variant='caption'>
          Scores based on about 3 responses to Indeed's survey on work happiness
        </Typography>
      </Grid>
      <Grid container item style={{ flex: 3, flexDirection: "row" }}>
        <Grid
          item
          xl={4}
          lg={4}
          style={{
            padding: "20px",
          }}>
          <Typography variant=''>
            <HtmlTooltip
              open={tooltipopen}
              title='Do people feel happy at work most of the time?'
              arrow>
              <span>
                <b>{companyDetails.averageWorkHappinessScore}</b>
              </span>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Work Happiness Score</b>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          style={{
            padding: "20px",
          }}>
          <Typography variant=''>
            <HtmlTooltip
              open={tooltipopen}
              title='Do people feel they are achieving most of their goals at work?'
              arrow>
              <b>{companyDetails.averageAppreciationScore}</b>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Achievement Score</b>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          style={{
            padding: "20px",
          }}>
          <Typography variant=''>
            <HtmlTooltip
              open={tooltipopen}
              title='Do people feel they often learn something at work?'
              arrow>
              <b>{companyDetails.averageLearningScore}</b>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Learning</b>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: "100px", marginBottom: "50px" }}>
        <Typography variant='h5'>
          <b>About the company</b>
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item style={{ flex: 1 }}>
          <img
            src='https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80'
            alt={companyDetails.employerName}
            style={{ height: "350px", borderRadius: "10px" }}
          />
        </Grid>
        <Grid container item style={{ flex: 6, flexDirection: "row" }}>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>CEO</div>
            <br />
            <br />
            <div>{companyDetails.aboutTheCompany.ceo}</div>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Revenue</div>
            <br />
            <br />
            <div>{companyDetails.aboutTheCompany.revenue}</div>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Company size</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.companySize}</div>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Industry</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.industry}</div>
          </Grid>
        </Grid>
        <Grid container item style={{ flex: 6, flexDirection: "column" }}>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Founded</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.founded}</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ padding: "40px" }}>
        <Typography
          variant='body2'
          style={{ color: "#767676", textAlign: "left" }}>
          {companyDetails.aboutTheCompany.description}
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.misssionandvisson}
          </Typography>
        </Typography>
      </Grid>
    </div>
  );
  const showReviews = () => (
    <div class='container-fluid'>
      <Typography variant='h4'>
        <b>{companyDetails.employerName} Employee Reviews</b>
      </Typography>
      <Grid
        item
        style={{
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "50px",
          backgroundColor: "#d3d3d34f",
          height: "100px",
          boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        }}>
        <FormControl>
          <ButtonGroup
            variant='outlined'
            aria-label='outlined button group'
            style={{ padding: "35px" }}>
            <Button value='Rating' onClick={(e) => handleSort("overallRating")}>
              Rating
            </Button>
            <Button
              value='Helpfullness'
              onClick={(e) => handleSort("isHelpfulCount")}>
              Helpfullness
            </Button>
            <Button value='Date' onClick={(e) => handleSort("createdAt")}>
              Date
            </Button>
          </ButtonGroup>
        </FormControl>
        <FormControl style={{ padding: "37px" }}>
          <Select
            className={classes.outlinedInput}
            variant='outlined'
            value={filterValue}
            name='filterVal'
            onChange={(e) => setFilterValue(e.target.value)}
            style={{ height: "30px" }}>
            {values.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      {companySpecificReviews && (
        <div>
          <Grid item style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Typography>
              Found <b>{companySpecificReviews.length}</b> reviews matching the
              search
            </Typography>
          </Grid>
          <Grid container spacing={10}>
            {companySpecificReviews.map((item) => {
              return (
                <ReviewBox
                  key={item.id}
                  rating={item.overallRating}
                  review_title={item.reviewTitle}
                  date={item.date}
                  yourReview={item.yourReview}
                  pros={item.pros}
                  cons={item.cons}
                  helpfulCount={item.isHelpfulCount}
                />
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
  const showPhotos = () => (
    <div className='row'>
      <div className='col-md-9'>
        <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
          <span>
            <CameraAltIcon></CameraAltIcon>{" "}
            <b>{companyDetails.companyName} Photos</b>
          </span>
        </Grid>
      </div>
      <UplaodButton type='submit' variant='contained'>
        Uplaod photo
      </UplaodButton>
    </div>
  );
  const showFooter = () => (
    <div>
      <Grid
        container
        spacing={1}
        style={{
          fontSize: "14px",
          backgroundColor: "white",
          padding: "15px 10px",
          margin: "50px -20px 0",
        }}>
        <Grid item style={{ cursor: "pointer" }}>
          ©️ 2020 Indeed
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
    </div>
  );
  const showWhyJoinUs = () => (
    <>
      <Grid
        item
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          marginLeft: "100px",
        }}>
        <Typography variant='caption'>
          About {companyDetails.companyName}
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          marginTop: "20px",
          marginBottom: "50px",
          marginLeft: "100px",
        }}>
        <Typography variant='h5'>
          <b>About the company</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.description}
          </Typography>
        </Grid>
        <Typography variant='h5'>
          <b>Work Culture</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.workCulture}
          </Typography>
        </Grid>
        <Typography variant='h5'>
          <b>Company Values</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.companyValues}
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  return (
    <div>
      <Container maxwidth='xl'>
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
                  value={rating}
                  precision={0.5}
                  readOnly
                />
                {companySpecificReviews && (
                  <Typography variant='caption'>
                    {" "}
                    {companySpecificReviews.length} reviews
                  </Typography>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              color={"primary"}
              variant='contained'
              type='submit'
              onClick={handleOpen}>
              {" "}
              Review this Company{" "}
            </Button>
            <br />
            {/* <Typography variant="caption" >Get weekly updates, new jobs, and reviews</Typography> */}
          </Grid>
        </Grid>

        <Grid container style={{ height: "40px" }}>
          <Grid
            item
            className={
              props.match.params.pathname === "snapshot"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("snapshot")}>
            SnapShot
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
              props.match.params.pathname === "salaries"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("salaries")}>
            Salaries
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
          <Grid
            item
            className={
              props.match.params.pathname === "jobs"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("jobs")}>
            Jobs
          </Grid>
          <Grid
            item
            className={
              props.match.params.pathname === "qanda"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("qanda")}>
            Q&A
          </Grid>
          <Grid
            item
            className={
              props.match.params.pathname === "interviews"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("interviews")}>
            Interviews
          </Grid>
        </Grid>
        <hr style={{ marginTop: 0 }}></hr>
        {props.match.params.pathname === "snapshot" && showSnapShot()}
        {props.match.params.pathname === "reviews" && showReviews()}
        {props.match.params.pathname === "photos" && showPhotos()}
        {props.match.params.pathname === "whyjoinus" && showWhyJoinUs()}
        {showFooter()}
      </Container>

      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form className={classes.formStyle} onSubmit={reviewSubmithandler}>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                <span style={{ margin: "0px 15px" }}>Overall Rating </span>
                <span style={{ margin: "0px 15px" }}>Work Happiness Score</span>
                <span style={{ margin: "0px 15px" }}>Learning Score</span>
                <span style={{ margin: "0px 15px" }}>Appreciation</span>
              </FormHelperText>
              <span style={{ margin: "0px 25px" }}>
                <Rating
                  name='simple-controlled'
                  value={newRating}
                  onChange={(event, newValue) => {
                    setnewRating(newValue);
                  }}
                />
              </span>
              <span style={{ margin: "0px 25px" }}>
                <Rating
                  name='simple-controlled'
                  value={workHappinessScore}
                  onChange={(event, newValue) => {
                    setWorkHappinessScore(newValue);
                  }}
                />
              </span>
              <span style={{ margin: "0px 45px" }}>
                <Rating
                  name='simple-controlled'
                  value={learningScore}
                  onChange={(event, newValue) => {
                    setLearningScore(newValue);
                  }}
                />
              </span>
              <span>
                <Rating
                  name='simple-controlled'
                  value={appreciationScore}
                  onChange={(event, newValue) => {
                    setAppreciationScore(newValue);
                  }}
                />
              </span>
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                <span style={{ margin: "0px 10px" }}>Review Title </span>
                <span style={{ margin: "0px 50px" }}>Review Role</span>
                <span style={{ margin: "0px 60px" }}>City</span>
                <span style={{ margin: "0px 70px" }}>State</span>
              </FormHelperText>
              <TextField
                type='text'
                style={{ width: "150px" }}
                value={reviewTitle}
                required
                onChange={(event) => {
                  setReviewTitle(event.target.value);
                }}
                variant='outlined'
                placeholder='Review Title'
              />
              <TextField
                type='text'
                required
                style={{ width: "150px", margin: "0px 35px" }}
                value={reviewRole}
                onChange={(event) => {
                  setReviewRole(event.target.value);
                }}
                variant='outlined'
                placeholder='Review Role'
              />
              <TextField
                type='text'
                required
                style={{ width: "150px", margin: "0px 10px" }}
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                variant='outlined'
                placeholder='City'
              />
              <TextField
                type='text'
                required
                style={{ width: "150px" }}
                value={st}
                onChange={(event) => {
                  setState(event.target.value);
                }}
                variant='outlined'
                placeholder='State'
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Review Summary
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                type='text'
                multiline
                rows={3}
                rowsMax={4}
                value={reviewSummary}
                onChange={(event) => {
                  setReviewSummary(event.target.value);
                }}
                variant='outlined'
                placeholder='Review Summary'
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Pros
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                multiline
                rows={2}
                rowsMax={4}
                value={pros}
                onChange={(event) => {
                  setPros(event.target.value);
                }}
                type='text'
                variant='outlined'
                placeholder='Pros'
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Cons
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                multiline
                rows={2}
                rowsMax={4}
                type='text'
                value={cons}
                onChange={(event) => {
                  setCons(event.target.value);
                }}
                variant='outlined'
                placeholder='Cons'
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Interview Preparation
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                multiline
                rows={2}
                rowsMax={4}
                type='text'
                value={interviewPrep}
                onChange={(event) => {
                  setinterviewPrep(event.target.value);
                }}
                variant='outlined'
                placeholder='   Interview Preparation'
              />
            </Grid>
            <br />
            <Grid>
              {/* <SearchButton type='submit' variant='contained'>
                Post
              </SearchButton> */}
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}