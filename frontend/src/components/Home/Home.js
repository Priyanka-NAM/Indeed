// import { Container } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import SearchForm from '../Layout/Forms/SearchForm/SearchForm';
// import RecentSearch from '../Layout/RecentSearch';
const styles = {
    container:{
        padding:'0px 10vw',
        marginTop:'80px'
    },
    linkContainer:{
        textAlign:'center',
        marginTop:'30px'
    },
    link:{
        fontWeight:'bolder',
    }
};
const Home = (props) => {
    
    return (
        <Container style={styles.container}>
            {/* <SearchForm /> */}
            <div style={styles.linkContainer}>
                <Link style={styles.link} to="/postjob">
                    {`Employers Yours next job is - `} 
                </Link>
                Your next hire is here
            </div>
            {/* <RecentSearch /> */}
        </Container>
    );
}

export default Home;