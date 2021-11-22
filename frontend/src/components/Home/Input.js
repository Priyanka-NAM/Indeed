import { Box, Typography } from '@material-ui/core';
import React, { useState , useRef, useEffect} from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';


function Input({classes, label, search}) {
    return (
        <Box className={classes.suggestionInput}>
            <Typography variant='h5'>
                {label}
                </Typography>
            <OutlinedInput
            className={classes.input } placeholder={search}/>
        </Box>
    );
}

export default Input;