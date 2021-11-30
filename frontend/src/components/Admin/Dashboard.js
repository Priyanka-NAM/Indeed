import React from 'react';
import Header from '../Header/Header';
import DonutChart from "./DonutChart";
import DonutChart1 from "./DonutChart1";
import "./style.css";
import { BarChart } from "react-d3-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTopRatedCompanies,
  } from "../../Redux/Actions/AdminAction";
import LineGraph from './LineGraph';
import LineGraph1 from './LineGraph1';
import PieChart from './PieChart';
import {Login} from '../Login/Login';


function Admindashboard() {
    const dispatch = useDispatch();
    const loginReducer = useSelector((state) => state.login);
    const { isAuth, userDetails } = loginReducer;
    const { topCompanyRatings } = useSelector(
        (state) => state.TopRatingCompanies
      );
      let data;
      let data1; 
      console.log(topCompanyRatings);
      if(topCompanyRatings){
        data = [
            {
              label: "Expert",
              values: [
                { x: (topCompanyRatings[0].companyName || 'Nvidea'), y: topCompanyRatings[0].averageRating },
                { x: (topCompanyRatings[1].companyName || 'Neon'), y: topCompanyRatings[1].averageRating },
                { x: (topCompanyRatings[2].companyName || 'Amazon'), y: topCompanyRatings[2].averageRating },
                { x: (topCompanyRatings[3].companyName || 'Swift'), y: topCompanyRatings[3].averageRating },
                { x: (topCompanyRatings[4].companyName || 'bmw'), y: topCompanyRatings[4].averageRating },
              ]
            }
          ];
      }
     
    useEffect(() => {
       dispatch(getTopRatedCompanies());
    }, [])
    return (
      <>
      {userDetails && userDetails.role === 2 ? (
        <div>
            <Header />
            <div class="container" style={{ backgroundColor: 'rgb(181 183 245)', minHeight: '45rem', border: '1px solid #d0d0e1'}}>
              <h3 style={{textAlign: "center", color: 'darkslategrey', fontFamily: "cursive"}}> Analystics</h3>
             
              <div className="row">
                <div className="col md-12 lg-12" style={{backgroundColor: "rgb(181 183 245)" }}>
                <LineGraph1 />
                </div>
       
              </div>
            <div className="row">
               <div className="col md-2 lg-2" style={{backgroundColor: '#dce5f5'}}>
                    <DonutChart />
                 </div>
                 <div className="col md-2 lg-2" style={{backgroundColor: "rgb(188 197 239)"}}>
                 <h6>Top 5 companies based on average rating</h6>
                 <BarChart
        data={data}
        width={350}
        height={350}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
                   
                 </div>
            </div>
            <div className="row">
               <div className="col md-2 lg-2" id="chart" style={{backgroundColor: "rgb(146 146 227)"}}>
               <LineGraph />
              

                 </div>
                 <div className="col md-3 lg-3" style={{backgroundColor: "#b8c2d9"}}>
                 <DonutChart1 />
                 </div>
            </div>
            <div className="row">
               <div className="col md-2 lg-2" id="chart">
               {/* <PieChart /> */}

                 </div>
                 <div className="col md-3 lg-3">
                 </div>
            </div>
            <div class="row"> 
            <div className="col md-11 lg-11" style={{backgroundColor: "rgb(131 142 215)"}}>
            <h6 style={{textAlign: "center"}}> Top 10 companies based on number of views</h6>
            <BarChart
        data={data}
        width={600}
        height={300}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
                </div>
            </div>
           
            </div>
            
        </div>
      ): (<Login/>)}
        
        </>
    );
}

export default Admindashboard