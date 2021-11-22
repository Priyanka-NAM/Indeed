import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ForumIcon from '@material-ui/icons/Forum';
import { NavLink } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import UserMenu from './UserMenu';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#fff',
  },
  toolbar: {
    minHeight: '45px',
    display:'flex',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  logo:{
    height:'20px'
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  navigation:{
      width:'350px',
      display:'flex',
      justifyContent:'space-between',
      marginLeft:'30px'
  },
  header_container:{
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
  },
  header_left:{
    display:'flex',
  },
  header_right:{
    display:'flex',
    width:'350px',
    justifyContent:'space-between'
  },
  link:{
        marginLeft:'14px',
        '& a':{
            marginLeft:'20px'
        }
  }
}));

export default function Header() {
  const classes = useStyles();
  const isAuth = useSelector(state=>state.login.isAuth);
  console.log("isauthhh", isAuth)
  return (
    <div className={classes.root}>
      <AppBar elevation={0} color={'secondary'} position="static">
        <Toolbar className={classes.toolbar} >
            <Container className={classes.header_container} disableGutters maxWidth={false}>
                <Box className={classes.header_left}>
                    <img className={classes.logo} src="/Images/Indeed_logo.png" alt=""/>
                    <Box className={classes.link} display={{ xs: 'none', sm: 'block', md: 'block' }}>
                        <Typography component={NavLink} variant='h6' to='/' >
                            Find Jobs
                        </Typography>
                        <Typography component={NavLink} variant='h6' to='/' >
                            Company Reviews
                        </Typography>
                        <Typography component={NavLink} variant='h6' to='/' >
                            Find Salary
                        </Typography>
                    </Box>
                </Box>
                  {isAuth ? 
                  <Box className={classes.header_right} >
                    <IconButton
                        edge="start"
                        
                        color="inherit"
                        aria-label="open drawer"
                        >
                        <ForumIcon />
                        </IconButton>

                        <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        >
                            <NotificationsIcon />
                        </IconButton>
                        <UserMenu/>
                        <Typography style={{display:'flex',alignItems:'center'}} component={NavLink} variant='h6' to='/' >
                            Employers/jobs
                        </Typography>
                        </Box> : <Box className={classes.header_right} >
                        <Typography style={{display:'flex',alignItems:'center', color:"#0039C0"}} component={NavLink} variant='h6' to='/' >
                            Upload your resume
                        </Typography>
                          <Typography style={{display:'flex',alignItems:'center', color:"#0039C0"}} component={NavLink} variant='h6' to='/login' >
                            Sign in
                        </Typography>
                        <Typography style={{display:'flex',alignItems:'center'}} component={NavLink} variant='h6' to='/' >
                            Employers/jobs
                        </Typography>
                        </Box> }                    
            </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
