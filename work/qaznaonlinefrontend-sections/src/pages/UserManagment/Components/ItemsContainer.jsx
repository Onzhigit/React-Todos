import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    width: '100%',
    minHeight:'30px',
    marginTop:'30px',
    padding:'8px'
  },
}));

function ItemsContainer({children}) {
  const classes = useStyles();
  return (
    <Box component="div" m={ 1 } className={classes.root}>
      {children}
    </Box>
  );
}

export default ItemsContainer;
