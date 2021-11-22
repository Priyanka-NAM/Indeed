import {  Grid, Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from './Input';


function SearchGrid({classes, label, search}) {
    return (
        <Grid item lg={5} md={5} sm={5} xs={12}> 
            <Input classes={classes} label={label} search={search}/>
        </Grid>
    );
}

export default SearchGrid;