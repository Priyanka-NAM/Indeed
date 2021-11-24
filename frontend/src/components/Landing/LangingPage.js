import React from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';

function Landing() {
    const userDetails = useSelector(state=>state.login.userDetails);
    if (userDetails.email && !localStorage.getItem('token')) {
        let decoded = jwt_decode(userDetails.JWT)
        console.log("decoded : ", decoded)
        let token = "JWT " + userDetails.JWT
        localStorage.setItem("email", decoded.email)
        localStorage.setItem("userid", decoded._id)
        localStorage.setItem("token", token)
    }
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
}

export default Landing