import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Typography.header';
import { grey } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: '30px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px'
  },
}));

function RegionsInfoHeader({ villageData, districtData, type }) {
  //console.log(districtData, type);
  const classes = useStyles();

  const displayName = () => {
    if (type === "type_1") {
      //console.log('district', 'true');
      return districtData.area_name;
    }

    if (type === "type_2") {
      //console.log('village', 'true');
      return villageData.area_name;
    }

  };

  const displayCoords = () => {
    if (type === "type_1") {
      //console.log('district', 'true');
      return districtData.coordinate;
    }

    if (type === "type_2") {
      //console.log('village', 'true');
      return villageData.coordinate;
    }

  };

  return (
    <Paper className={ classes.paper }>
      <Box>
        <Header
          title={ displayName() }
          size="30px"
          fontWeight="700"
          color={ grey[900] }
        />
        { type && <Header
          title={ `Координаты: (${displayCoords()})` }
          size="22px"
          fontWeight="500"
          color={ grey[900] }
        /> }
      </Box>
    </Paper>
  );
}

export default RegionsInfoHeader;
