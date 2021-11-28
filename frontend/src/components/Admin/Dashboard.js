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



function Admindashboard() {
    const dispatch = useDispatch();
    const { topCompanyRatings } = useSelector(
        (state) => state.TopRatingCompanies
      );
      let data; 
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
        // BarChart(400, 600);
       dispatch(getTopRatedCompanies());
    }, [])
    return (
        <div>
            <Header />
            <div class="container" style={{ minHeight: '45rem'}}>
            <div className="row">
               <div className="col md-3 lg-3">
                    <DonutChart />
                 </div>
                 <div className="col md-3 lg-3">
                    <DonutChart1 />
                 </div>
            </div>
            <div className="row">
               <div className="col md-3 lg-3" id="chart">
               <BarChart
        data={data}
        width={500}
        height={500}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />

                 </div>
                 <div className="col md-3 lg-3">
                    
                 </div>
            </div>
            </div>


                 
             
            

            
        </div>
    );
}

export default Admindashboard