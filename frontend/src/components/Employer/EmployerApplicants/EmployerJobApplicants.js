import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography, Box, makeStyles, AppBar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TablePagination from "@material-ui/core/TablePagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

    body: {
        backgroundColor: "black",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
    },

    boxImg: {
        width: "450px",
        display: "flex",
        height: "40px",
        justifyContent: "center",
        margin: "60px 0 30px",
    },
    imgLogo: {
        height: "130px",
    },
    indeedLogo: {
        height: "40px",
    },
    boxForm: {
        backgroundColor: "#ffffff",
        width: "650px",
        padding: "20px",
    },
    outlinedInput: {
        borderRadius: "10px",
        border: "0.5px solid #2D2D2D",
        height: "42px",
        width: "100%",
        margin: "10px 0",
    },
    h5: {
        fontWeight: "bold",
        fontSize: "1.4rem",
        fontFamily:
            "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
    },
    h4: {
        fontSize: "1.75rem",
        fontWeight: "bold",
        fontFamily:
            "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
    },
    formHelperText: {
        fontWeight: "600",
        fontSize: "17.5px",
        color: "#4b4b4b",
    },
    checkbox: {
        marginBottom: "10px",
    },
    button: {
        width: "200px",
        borderRadius: "9px",
        height: "50px",
        color: "white",
        backgroundColor: "#065FF7",
    },

    formStyle: {
        width: "100%",
    },
    cardLook: {
        width: "100%",
        // marginLeft: "2%",
    },
    tableHeader: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#065FF7",
    },
    root: {
        marginLeft: "2%",
        marginRight: "2%",
    },
    tableBody: {
        width: "100%",
        marginLeft: "2%",
        marginRight: "2%",
        display: "flex",
        flexDirection: "row",
    },
    eachRow: {
        flex: "1",
    }

}))



const EmployerJobApplicants = ({match}) => {

    const classes = useStyles();

    const theme = createMuiTheme({
        palette: {
            background: {
                default: "#303030"
            }
        }
    })

    const dispatch = useDispatch();

    useEffect(() => {

    }, [match])

    return(
        <>
            EmployerJobApplicants
        </>
    )
}

export default EmployerJobApplicants