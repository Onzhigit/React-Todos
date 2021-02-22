import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Container, Typography } from '@material-ui/core';
import Table from './Components/Table';
import { connect } from 'react-redux';
import { getTimetableRequest, updateApplicationRequest } from '../../actions/services';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 1200,
    margin: '10px auto',
    backgroundColor: theme.palette.background.paper,
  },
  gridContainer: {
    marginTop: 3
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tab: {
    backgroundColor: "#3f51b5"
  },
  headerConitainer: {
    marginTop: 30,
    marginBottom: 30,
    padding: 30
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${index}` }
      aria-labelledby={ `simple-tab-${index}` }
      { ...other }
    >
      {value === index && (
        <Box>
          { children }
        </Box>
      ) }
    </div>
  );
}

const Applications = ({ getTimetableRequest, timetableRequests, updateApplicationRequest }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState('one');
  const [newApplications, setNewApplications] = React.useState([]);
  const [acceptedApplications, setAcceptedApplications] = React.useState([]);
  const [rejectedApplications, setRejectedApplications] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    //const newApplications = timetableRequests.filter(item => item.status_type === 'create')
    setNewApplications(filterApplications(timetableRequests, 'create'));
    setAcceptedApplications(filterApplications(timetableRequests, 'accepted'));
    setRejectedApplications(filterApplications(timetableRequests, 'rejected'));
  }, [timetableRequests]);

  const filterApplications = (timetableRequests, status) => {
    return timetableRequests.filter(item => item.status_type === status);
  };

  React.useEffect(() => {
    getTimetableRequest();
  }, [getTimetableRequest]);

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

  const showTable = (applications, action, index) => {
    return (
      <TabPanel value={ value } index={ index }>
        <Container className={ classes.root }>
          <Grid container spacing={ 3 } className={ classes.gridContainer }>
          </Grid>
          <Grid container spacing={ 3 } className={ classes.gridContainer }>
            <Grid item xs>
              <Paper className={ classes.paper }>
                <Table timetableRequests={ applications } updateApplicationRequest={ action } />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
    );
  };

  return (
    <div className={ classes.root }>
      <Paper className={ classes.headerConitainer } elevation={ 1 }>
        <Typography variant="h6" gutterBottom>
          Заявление на лагерь
        </Typography>
      </Paper>
      <AppBar position="static">
        <Tabs value={ value } onChange={ handleChange } aria-label="wrapped label tabs example" className={ classes.tab }>
          <Tab
            value="one"
            label="Новые заявки"
            wrapped
            { ...a11yProps('one') }
          />
          <Tab
            value="two"
            label="Принятые заявки"
            { ...a11yProps('two') }
          />
          <Tab
            value="three"
            label="Отклоненные заявки"
            { ...a11yProps('three') } />
        </Tabs>
      </AppBar>
      {showTable(newApplications, updateApplicationRequest, "one") }
      {showTable(acceptedApplications, updateApplicationRequest, "two") }
      {showTable(rejectedApplications, updateApplicationRequest, "three") }
    </div>
  );
};

Applications.propTypes = {
  getTimetableRequest: PropTypes.func.isRequired,
  updateApplicationRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  timetableRequests: state.serviceReducer.timetableRequests
});

export default connect(mapStateToProps, { getTimetableRequest, updateApplicationRequest })(Applications);