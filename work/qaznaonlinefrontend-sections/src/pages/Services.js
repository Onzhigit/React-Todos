import React from 'react';
import Services from '../sections';
import { Header } from '../components/Typography.header';
import { grey } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';

//const useStyles = makeStyles((theme) => ({}));

const SectionsPage = () => {
  //const classes = useStyles();
  return (
    <Grid 
      container 
      spacing={ 3 }
      justify="center"
    >
      <Grid item xs={ 8 } spacing={3}>
        <Header
          title="Виды услуг"
          alignment="center"
          size="30px"
          fontWeight="700"
          color={ grey[900] }
          marginTop="40px"
        />
        <Services />
      </Grid>
    </Grid>
  );



};

export default SectionsPage;
