import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Body from './Body';
const styles = {
    container:{
        padding:'0px 10vw',
        marginTop:'80px'
    },
    linkContainer:{
        marginLeft: '150px',
        marginTop:'30px'
    },
    link:{
        fontWeight:'bolder',
        color: '#0039C0'
    }
};
const Home = (props) => {
    
    return (
        <Container style={styles.container}>
            <Body />
            <div style={styles.linkContainer}>
                <Link style={styles.link} to="/">
                    {`Post your resume - `} 
                </Link>
                It only takes a few seconds
            </div>
        </Container>
    );
}

export default Home;