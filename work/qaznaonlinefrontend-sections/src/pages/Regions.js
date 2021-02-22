import React, { useState, useEffect } from 'react';
import Regions from "../regions/index";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RegionsInfoHeader from '../components/RegionsInfoHeader';
import ListOrganiations from '../components/ListOrganizations';
import { connect } from 'react-redux';
import { loadRegionsAction, addRegionAction, deleteRegionAction, updateRegionAction } from '../actions/regions';
import { setAlertAction } from '../actions/alert';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Header } from '../components/Typography.header';
import { grey } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: '40px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '40px'
  }
}));

const RegionsPage = ({ loadRegionsAction, regions, loadingRegions }) => {
  //console.log(regions, loadingRegions);
  const classes = useStyles();
  const [village, setVillage] = useState([]);
  const [district, setDistrict] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    loadRegionsAction();
  }, [loadRegionsAction]);

  return (
    <Box className={ classes.root }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 6 }>
          <Paper className={ classes.paper }>
            <Header
              title="Области"
              size="30px"
              fontWeight="700"
              color={ grey[900] }
            />
            { !loadingRegions ? (
              <Regions
                setVillage={ setVillage }
                setType={ setType }
                setDistrict={ setDistrict }
                regionsData={ regions }
              />
            ) : <p>loading</p> }

          </Paper>
        </Grid>
        <Grid className={ classes.infoContainer } item xs={ 6 }>
          <RegionsInfoHeader villageData={ village } type={ type } districtData={ district } />
          <ListOrganiations
            villageData={ village }
            type={ type }
            districtData={ district } />
        </Grid>
      </Grid>
    </Box>
  );
};

RegionsPage.propTypes = {
  loadRegionsAction: PropTypes.func.isRequired,
  addRegionAction: PropTypes.func.isRequired,
  deleteRegionAction: PropTypes.func.isRequired,
  updateRegionAction: PropTypes.func.isRequired,
  setAlertAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  regions: state.regionReducer.regions,
  loadingRegions: state.regionReducer.loading
});

export default connect(mapStateToProps, { loadRegionsAction, addRegionAction, deleteRegionAction, updateRegionAction, setAlertAction })(RegionsPage);