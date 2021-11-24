import { Box, Typography } from '@material-ui/core';
import React, { useState , useRef, useEffect} from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Input({classes, label, search, setQuery}) {
    const items = [
        {
          id: 0,
          name: 'software engineer'
        },
        {
          id: 1,
          name: 'Devops'
        },
        {
          id: 2,
          name: 'nodejs'
        },
        {
          id: 3,
          name: 'Backend developer'
        },
        {
          id: 4,
          name: 'Front end developer'
        }
      ]
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        setQuery(item.name)
        console.log(item)
      } 

    return (
        <Box className={classes.suggestionInput}>
            <Typography variant='h5'>
                {label}
                </Typography>
          <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                className={classes.input} 
                placeholder={search}
          />
          {/* <OutlinedInput className={classes.input } 
                placeholder={search} /> */}
        </Box>
    );
}

export default Input;