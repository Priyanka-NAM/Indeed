import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getcompaniesDetails } from '../../Redux/Actions/Company';
import axios from "axios";
import { ReviewBox } from "../Review/ReviewBox";
import Header from '../Header/Header'; 
import StarIcon from '@material-ui/icons/Star';
import { Rating } from '@mui/material';
import CameraAltIcon from '@material-ui/icons/CameraAltRounded';
import { Grid, 
    Container,
    makeStyles,
    Typography,
    Button,
    withStyles,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    ButtonGroup,

} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    imgCont: {
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    optionTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        // '&:hover': {
        //     borderBottom: "5px solid #397ff8",
        //     fontWeight: "bold"
        // }
    },
    activeTab: {
        cursor: "pointer",
        margin: "0 40px 0 40px",
        fontWeight: "bold",
        borderBottom: "5px solid #000000",

    }
}))

const FollowButton = withStyles((theme) => ({
    root: {
        color: "#ffffff",
        backgroundColor: "#085ff7",
        cursor: "pointer",
        width: "200px",
        borderRadius: "200px",
        height: "43px",
        marginLeft: "50px",
        '&:hover': {
            backgroundColor: "#0542ac",
        },
    },
}))(Button);

export default function Review(props) {
    const classes = useStyle();
    const {responseFromServer} = useSelector(state => state.companyDetails);
    const companyDetails = responseFromServer ? responseFromServer : [];
    const [values, setValues] = React.useState([
        "Helpfull Review",
        "Unhelpfull review",
        "Rating"
      ]);
    const [filterValue, setFilterValue] = React.useState(["Helpfull Review" ]);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(4);
    const query = new URLSearchParams(props.location.search);
    const id =query.get('id')
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state=>state.login)
    useEffect(()=>{
        dispatch(getcompaniesDetails({ employerID: props.match.params.id}));
        setRating(companyDetails.noOfRatings);
    },[props.match])
    const changePathName = (pathName) => {
        props.history.push(`/company/${props.match.params.id}/${pathName}`);
    }

     //SnapShot page strats here
     const showSnapShot = () => (
        <div>
        <Grid item style = {{marginTop: "20px", marginBottom: "30px"}} >
                <Typography variant = "caption" >{companyDetails || companyDetails.employerName} Careers and Employment</Typography>
            </Grid>
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography variant = "h4"><b>Work happiness</b></Typography>
            </Grid>
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
                <Typography variant = "h4"><b>About the company</b></Typography>
            </Grid>
         <Grid container spacing={1} >
                <Grid item style = {{flex:1}} >
                    <img src="https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80" alt={companyDetails.employerName} style={{height: "350px", borderRadius: "10px"}}/>
                </Grid>
                <Grid container item style = {{flex:6, flexDirection: "row"}}>
                <Grid item xl={5} lg={5}  style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            CEO
                        </div>
                        <br/><br/>
                        <div>
                            {companyDetails || companyDetails.aboutTheCompany.ceo}
                        </div>
                    </Grid>
                    <Grid item xl={5} lg={5} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Revenue
                        </div>
                        <br/><br/>
                        <div>
                            {companyDetails || companyDetails.aboutTheCompany.revenue}
                        </div>
                    </Grid>
                    <Grid item xl={5} lg={5} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Company size
                        </div>
                        <br/><br/>
                        <div style = {{}}>
                            {companyDetails || companyDetails.aboutTheCompany.companySize}
                        </div>
                    </Grid>
                <Grid item xl={5} lg={5} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Industry
                        </div>
                        <br/><br/>
                        <div style = {{}}>
                            {companyDetails || companyDetails.aboutTheCompany.industry}
                        </div>
                    </Grid>
                    
                </Grid>
                <Grid container item style = {{flex:6, flexDirection: "column"}}>
                <Grid item xl={5} lg={5} style = {{border: "2px solid #f2f2f2", borderRadius: "10px", padding: "20px"}}>
                        <div style = {{fontWeight: "600"}}>
                            Founded
                        </div>
                        <br/><br/>
                        <div style = {{}}>
                            {companyDetails || companyDetails.aboutTheCompany.founded}
                        </div>
                    </Grid>
                  
                   
                </Grid>
            </Grid>
            <Grid container style = {{ padding: "40px"}}>
                <Typography variant = "body2" style = {{color: "#767676", textAlign: "left"}}>
                    {companyDetails || companyDetails.aboutTheCompany.description}
                    <Typography variant = "body2" style = {{color: "#767676", textAlign: "left"}}>
                    {companyDetails || companyDetails.aboutTheCompany.misssionandvisson}
                </Typography>
                </Typography>
            </Grid>
            <Grid item style = {{marginTop: "30px", marginBottom: "50px"}}>
                <Typography variant = "h4"><b>Reviews</b></Typography>
            </Grid>
            <Grid container spacing={10}>
                {
                    reviews.map((item) => {
                        return (
                            <ReviewBox 
                                key = {item.id}
                                rating = {item.rating}
                                job_position = {item.job_position}
                                date = {item.date}
                                title = {item.title}
                                description = {item.description}
                            />
                        )
                    })
                }
            </Grid>
        </div>
      );
      const showReviews = () => (
          <div class="container-fluid">
        <Grid item style = {{alignItems: "center", marginTop: "20px", marginBottom: "50px", backgroundColor: "#d3d3d34f", height: '100px'}}>
        <FormControl>
        <ButtonGroup variant="outlined" aria-label="outlined button group" style={{padding: '35px'}}>
  <Button>Rating</Button>
  <Button>Helpfull</Button>
  <Button>Unhelpfull</Button>
</ButtonGroup>
</FormControl>
    <FormControl style={{padding: "35px", height: "17px"}}>
    <Select
                className={classes.outlinedInput}
                variant='outlined'
                value={filterValue}
                name='filterVal'
                onChange={(e)=> setFilterValue(e.target.value)}
                >
       {values.map((value, index) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
        </Select>
    </FormControl>
    
        </Grid>
         <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
            <Typography variant = "h4"><b>{companyDetails || companyDetails.aboutTheCompany.industry} Employee Reviews</b></Typography>
        </Grid>
             

          </div>
      );
      const showPhotos = () => (
        <div> 
             
            <Grid item style = {{marginTop: "20px", marginBottom: "50px"}}>
             <span><CameraAltIcon></CameraAltIcon> <b>{companyDetails || companyDetails.companyName} Photos</b></span>
            </Grid>
        </div>
    );
    const showFooter = () => (
        <div>
                        <Grid container spacing = {1} style = {{fontSize : "14px", backgroundColor: "white", padding: "15px 10px", margin : "50px -20px 0"}} >
              <Grid item style = {{cursor: "pointer"}}>
              © 2020 Indeed
              </Grid>
              <Grid item>
                  -
              </Grid>
              <Grid item style = {{cursor: "pointer"}}>
                  Accessibility at Indeed
              </Grid>
              <Grid item>
                  -
              </Grid>
              <Grid item style = {{cursor: "pointer"}}>
                  Privacy Center
              </Grid>
              <Grid item>
                  -
              </Grid>
              <Grid item style = {{cursor: "pointer"}}>
                  Cookies
              </Grid>
              <Grid item>
                  -
              </Grid>
              <Grid item style = {{cursor: "pointer"}}>
                  Privacy
              </Grid>
              <Grid item>
                  -
              </Grid>
              <Grid item style = {{cursor: "pointer"}}>
                  Terms
              </Grid>
          </Grid>
        </div>
    );
    return (

            <div>
             <Header />
             <Container maxwidth = "xl">
              <div class="jumbotron text-white jumbotron-image shadow" style={{backgroundImage: `url(https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80)`, backgroundSize: 'cover',  height: '250px',backgroundRepeat: 'no-repeat',backgroundPosition: 'center center' }} >
                {/* <h2 class="mb-4">
                
                </h2>
                <p class="mb-4">
                    
                </p>
                <a href="https://bootstrapious.com/snippets" class="btn btn-primary">Write a review</a> */}
                </div>
                <Grid container style = {{justifyContent:"space-between", alignItems: "center", marginBottom: "20px"}}>
                <Grid container item lg={6} md={7} sm={8}>
                    <Grid item className = {classes.imgCont} >
                        <img src="https://images.unsplash.com/photo-1552152974-19b9caf99137?fit=crop&w=1350&q=80" alt='' width="100px" />
                    </Grid>
                    <Grid item style = {{paddingTop: "40px", paddingLeft: "20px"}}>
                        <Typography variant="h5" >{ companyDetails || companyDetails.companyName}</Typography>
                        <Typography variant="h5" >
                            {companyDetails|| companyDetails.noOfRatings}
                            {/* <StarIcon style = {{color: "#9d2b6b", paddingRight: "10px"}}/> */}
                            <Rating name="half-rating-read" style = {{color: "#9d2b6b", paddingRight: "10px"}} value={rating} precision={0.5} readOnly/>
                        <Typography variant="caption" >25 reviews</Typography>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid  item >
                    <Button color={'primary'} variant='contained' type='submit'> Write a Review </Button>
                    <br/>
                    {/* <Typography variant="caption" >Get weekly updates, new jobs, and reviews</Typography> */}
                </Grid>
            </Grid>
               
                <Grid container style = {{height: "40px"}}>
                <Grid item className = {props.match.params.pathname === 'snapshot' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('snapshot')}>
                    SnapShot
                </Grid>
                <Grid item className = {props.match.params.pathname === 'whyjoinus' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('whyjoinus')}>
                    Why Join Us
                </Grid>
                <Grid item className = {props.match.params.pathname === 'reviews' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('reviews')}>
                     Reviews
                </Grid>
                <Grid item className = {props.match.params.pathname === 'salaries' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('salaries')}>
                     Salaries
                </Grid>
                <Grid item className = {props.match.params.pathname === 'photos' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('photos')}>
                     Photos
                </Grid>
                <Grid item className = {props.match.params.pathname === 'jobs' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('jobs')}>
                     Jobs
                </Grid>
                <Grid item className = {props.match.params.pathname === 'qanda' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('qanda')}>
                     Q&A
                </Grid>
                <Grid item className = {props.match.params.pathname === 'interviews' ? classes.activeTab : classes.optionTab} onClick={()=>changePathName('interviews')}>
                    Interviews
                </Grid>
             
            </Grid>
            <hr style={{marginTop:0}}></hr>
            {props.match.params.pathname === 'snapshot' && showSnapShot()}
            {props.match.params.pathname === 'reviews' && showReviews()}
            {props.match.params.pathname === 'photos' && showPhotos()}
            {showFooter()}

            </Container>
            </div>
            
            
    )
}
