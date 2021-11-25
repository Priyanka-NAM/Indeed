import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import { Grid, Typography } from '@material-ui/core';
import { Rating } from "@mui/material";


export function ReviewBox({ rating, review_title, date, yourReview, pros, cons }) {
    return (
            <Grid item container spacing={4} style={{borderBottom: '#00000029 solid 1px'}}>
            <Grid item container spacing={2}>
                <Grid item>
                <h4>{rating}.0</h4>
                <Rating
                  name="size-small"
                  style={{ color: "#9d2b6b"}}
                  value={rating}
                  size="small"
                  precision={0.5}
                  readOnly
                />                </Grid>
                <Grid item>
                    <Typography variant = "head2" style = {{fontWeight: "800"}}>{review_title}</Typography>
                    
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {yourReview}
                </Typography>
            </Grid>
            <Grid item container spacing={3}>
            <span><i class="fas fa-check" style={{color: "green"}}></i></span>
            <div spacing={3}><b> Pros </b></div><br></br>
            </Grid>
            <Grid item container spacing={3}>
            <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {pros}
                </Typography>
            </Grid>
            <Grid item container spacing={3}>
            <i class="fa fa-times" aria-hidden="true" style={{color: "red"}}></i><br></br>
            <div spacing={3}><b>Cons </b> </div>
            </Grid>
         
            <Grid item container spacing={3}>
            <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {cons}
                </Typography>
            </Grid>
        </Grid>
    )
  
}