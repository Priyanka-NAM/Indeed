import {  Box, Button, Grid} from '@material-ui/core';
import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import SearchGrid from './SearchGrid';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
    input:{
        width:'100%',
        height:'45px',
        
    },
    removeMargin:{
        margin:'0'
    },
    searchForm:{
        display:'flex',
        justifyContent:'center'
    },
    btn_Container:{
        display:'flex',
        alignItems:'flex-end',
        
        '& button':{
            width:'100%',
            height:"45px",
            fontSize:'13px',
            fontWeight:'bold',
            borderRadius:'10px'
        }
    },
    suggestionInput:{
        position:'relative'
    },
    autocontainer:{
        border:`1px solid ${theme.palette.primary.main}`,
        width:'99%',
        backgroundColor:"white",
        borderBottomLeftRadius:'5px',
        borderBottomRightRadius:'5px',
        zIndex:'10',
        paddingBottom:'30px',
        position:'absolute',
        '& div':{
            marginTop:'30px'
        },
        
    },
  }))

function Home(props) {
    const classes = useStyles();
    const [redirectJobs, setRedirectJobs] = useState(null)
    const [job,setJob] = useState('');
    const [location,setLocation] = useState('');
    const handleJobs = () => {
        const data = {
            "job": job,
            "location": location
        }
        setRedirectJobs(<Redirect to={{
            pathname: '/indeed/jobs',
            state: { query: data }
        }} />)
    }
    return (
        <>
        {redirectJobs}
            <form  className={classes.searchForm} onSubmit={handleJobs}>
                <Grid container spacing={1}>
                    
                    <SearchGrid setQuery={setJob} label={'What'} search={'Job Title, keywords, or company'} classes={classes} />

                    <SearchGrid setQuery={setLocation} label={'Where '} search={'location'} classes={classes} />

                    <Grid item lg={2} md={2} sm={2} xs={12} className={classes.btn_Container}>
                        <Button color={'primary'} variant='contained' type='submit'>
                            Find Jobs
                        </Button>
                    </Grid>
                </Grid>
            </form>
       </>  
    );
}

export default Home;