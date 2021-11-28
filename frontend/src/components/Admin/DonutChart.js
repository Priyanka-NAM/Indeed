
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pie, Doughnut } from "react-chartjs-2";
import {
    getTopReviewedCompanies,
  } from "../../Redux/Actions/AdminAction";
import { blue } from "@mui/material/colors";

export default function DonutChart(props) {
    const dispatch = useDispatch();
    let state = {};
    const { topCompanyReviewes } = useSelector(
        (state) => state.TopReviewedCompanies
      ); 
      if(topCompanyReviewes){
      let labels = topCompanyReviewes.map((el) => el["companyName"]);
       console.log(labels);
      let numbers = topCompanyReviewes.map((el) =>
        el.noOfRatings
      );
      console.log(numbers);
       state = {
        labels,
        datasets: [
          {
            label: "Arm Sales",
            data: numbers,
            backgroundColor: ["#F54EA2", "#41b6e6", "#FE9000", "#7ebc59", "#8134af"],
            hoverBackgroundColor: [
              "#b9006e",
              "#005792",
              "#C1292E",
              "#2b9464",
              "#42218E"
            ]
          }
        ]
      };
    }
  
    useEffect(() => {
        dispatch(getTopReviewedCompanies());
      }, []);
    const formatNumber = (num) => {
        debugger;
      return num.toString("").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
      <div>
        <Pie
          data={state}
          width={450}
          height={400} 
          radius={110}
          innerRadius={20}
          backgroundColor={'blue'}
          options={{
            title: {
              display: true,
              text: "Top Five Most Reviewed Companies",
              fontSize: 20
            },
            // responsive: true,
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontSize: 20, //labels font size
                fontColor: "#000"
              }
            },
            plugins: {
              datalabels: {
                font: {
                  size: 100
                }
              }
            },
            tooltips: {
              bodyFontSize: 20,
              callbacks: {
                label: function (tooltipItem, data) {
                  // console.log({ tooltipItem, data });
                  const label = data.labels[tooltipItem.index]; //index gives the the index of this data item in the dataset
                  // console.log(data.labels[2])
                  const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]; //finding the matching data item in dataset
                

                  return `${label}: ${value}`;
                }
              }
            }
          }}
        />
      </div>
    );
}
